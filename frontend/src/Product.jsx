import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CountdownTimer from "./CountdownTimer";
import { Heart } from "lucide-react";

function Product() {
  const [products, setProducts] = useState([]);
  const [bids, setBids] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const defaultProducts = [
      { id: "default1", title: "EUREKA", description: "Rare vintage piece from 1800s.", image: "/antique1.jpg", bid: 3000, isDefault: true, category: "Antiques & Collectibles", condition: "Excellent" },
      { id: "default2", title: "Antique Toy", description: "Classic toy from the 70s.", image: "/toy1.jpg", bid: 1500, isDefault: true, category: "Toys & Games", condition: "Good" },
      { id: "default3", title: "Historic Coin", description: "Pre-independence era coin.", image: "/coin1.jpg", bid: 800, isDefault: true, category: "Coins & Currency", condition: "Fair" },
      { id: "default4", title: "War Sword", description: "Handcrafted medieval sword.", image: "/sword2.jpg", bid: 7500, isDefault: true, category: "Antiques & Collectibles", condition: "Excellent" },
      { id: "default5", title: "Old Vase", description: "Royal antique ceramic vase.", image: "/antique2.jpg", bid: 2000, isDefault: true, category: "Antiques & Collectibles", condition: "Good" },
      { id: "default6", title: "Vintage Toy Car", description: "Limited edition model.", image: "/toy3.jpg", bid: 1200, isDefault: true, category: "Toys & Games", condition: "Mint" },
      { id: "default7", title: "Silver Coin", description: "Ancient silver currency.", image: "/coin2.jpg", bid: 950, isDefault: true, category: "Coins & Currency", condition: "Good" },
      { id: "default8", title: "Antique Phone", description: "Retro dialer in mint condition.", image: "/antique3.jpg", bid: 2700, isDefault: true, category: "Electronics", condition: "Mint" },
      { id: "default9", title: "Wooden Toy", description: "Hand-carved toy from Kerala.", image: "/toy2.jpg", bid: 1000, isDefault: true, category: "Toys & Games", condition: "Excellent" },
      { id: "default10", title: "Bronze Coin", description: "From ancient temple discovery.", image: "/coin3.jpg", bid: 1100, isDefault: true, category: "Coins & Currency", condition: "Fair" },
      { id: "default11", title: "Decorative Sword", description: "Wall decor piece, engraved.", image: "/sword1.jpg", bid: 3500, isDefault: true, category: "Antiques & Collectibles", condition: "Good" },
      { id: "default12", title: "Royal Sword", description: "Used by nobles in 1600s.", image: "/sword3.jpg", bid: 6800, isDefault: true, category: "Antiques & Collectibles", condition: "Excellent" },
    ];

    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "auctions"));
      const firestoreProducts = snapshot.docs.map((d) => ({
        id: d.id,
        title: d.data().title,
        description: d.data().description,
        category: d.data().category,
        condition: d.data().condition,
        image: d.data().imageURL,
        bid: d.data().currentBid ?? d.data().startBid,
        reservePrice: d.data().reservePrice,
        shippingInfo: d.data().shippingInfo,
        endTime: d.data().endTime,
        isDefault: false,
      }));

      const merged = [...defaultProducts, ...firestoreProducts];
      setProducts(merged);
      setBids(Array(merged.length).fill(""));
    };

    fetchProducts();

    const unsubscribe = onSnapshot(collection(db, "auctions"), (snapshot) => {
      const firestoreProducts = snapshot.docs.map((d) => ({
        id: d.id,
        title: d.data().title,
        description: d.data().description,
        category: d.data().category,
        condition: d.data().condition,
        image: d.data().imageURL,
        bid: d.data().currentBid ?? d.data().startBid,
        reservePrice: d.data().reservePrice,
        shippingInfo: d.data().shippingInfo,
        endTime: d.data().endTime,
        isDefault: false,
      }));

      setProducts((prev) => [
        ...prev.filter((p) => p.isDefault),
        ...firestoreProducts,
      ]);
    });

    return () => unsubscribe();
  }, []);

  const handleBidChange = (value, i) => {
    const updated = [...bids];
    updated[i] = value;
    setBids(updated);
  };

  const handleBidSubmit = async (i) => {
    if (!user) {
      alert("Please login to place a bid.");
      return;
    }

    const enteredBid = Number(bids[i]);
    const product = products[i];

    if (isNaN(enteredBid) || enteredBid <= product.bid) {
      alert("Enter a valid higher bid.");
      return;
    }

    try {
      if (product.isDefault) {
        const updated = [...products];
        updated[i] = { ...product, bid: enteredBid };
        setProducts(updated);
      } else {
        const productRef = doc(db, "auctions", product.id);
        await updateDoc(productRef, {
          currentBid: enteredBid,
          currentBidder: user.uid,
        });
      }

      setBids((prev) => {
        const cleared = [...prev];
        cleared[i] = "";
        return cleared;
      });
    } catch (err) {
      console.error("Bid error:", err);
      alert("Failed to place bid.");
    }
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product, i) => (
        <div key={product.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
          <img src={product.image} alt={product.title} className="w-full h-60 object-cover" />

          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white">{product.title}</h3>
              <Heart
                onClick={() => toggleWishlist(product)}
                className={`w-5 h-5 cursor-pointer ${
                  wishlist.find((p) => p.id === product.id)
                    ? "text-red-500 fill-current"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              />
            </div>

            <p className="text-sm text-gray-400">{product.description}</p>
            <p className="text-xs text-gray-500 mb-1">Category: {product.category || 'Antiques'}</p>
            <p className="text-xs text-gray-500 mb-1">Condition: {product.condition || 'Excellent'}</p>
            <p className="text-emerald-400 font-semibold">₹{product.bid}</p>
            {product.reservePrice && (
              <p className="text-xs text-gray-500">Reserve: ₹{product.reservePrice}</p>
            )}
            {product.shippingInfo && (
              <p className="text-xs text-gray-500 mt-1">Shipping: {product.shippingInfo}</p>
            )}

            <CountdownTimer
              initialMinutes={60}
              initialSeconds={0}
              isDefault={product.isDefault}
              endTime={product.endTime}
            />

            <input
              type="number"
              value={bids[i] || ""}
              onChange={(e) => handleBidChange(e.target.value, i)}
              placeholder="Enter your bid"
              className="w-full mt-2 bg-gray-700 border border-gray-600 px-2 py-1 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button
              onClick={() => handleBidSubmit(i)}
              className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-1 rounded transition-colors"
            >
              Submit Bid
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
