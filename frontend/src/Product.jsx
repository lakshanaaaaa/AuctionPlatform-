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
      { id: "default1", title: "EUREKA", description: "Rare vintage piece from 1800s.", image: "/antique1.jpg", bid: 3000, isDefault: true },
      { id: "default2", title: "Antique Toy", description: "Classic toy from the 70s.", image: "/toy1.jpg", bid: 1500, isDefault: true },
      { id: "default3", title: "Historic Coin", description: "Pre-independence era coin.", image: "/coin1.jpg", bid: 800, isDefault: true },
      { id: "default4", title: "War Sword", description: "Handcrafted medieval sword.", image: "/sword2.jpg", bid: 7500, isDefault: true },
      { id: "default5", title: "Old Vase", description: "Royal antique ceramic vase.", image: "/antique2.jpg", bid: 2000, isDefault: true },
      { id: "default6", title: "Vintage Toy Car", description: "Limited edition model.", image: "/toy3.jpg", bid: 1200, isDefault: true },
      { id: "default7", title: "Silver Coin", description: "Ancient silver currency.", image: "/coin2.jpg", bid: 950, isDefault: true },
      { id: "default8", title: "Antique Phone", description: "Retro dialer in mint condition.", image: "/antique3.jpg", bid: 2700, isDefault: true },
      { id: "default9", title: "Wooden Toy", description: "Hand-carved toy from Kerala.", image: "/toy2.jpg", bid: 1000, isDefault: true },
      { id: "default10", title: "Bronze Coin", description: "From ancient temple discovery.", image: "/coin3.jpg", bid: 1100, isDefault: true },
      { id: "default11", title: "Decorative Sword", description: "Wall decor piece, engraved.", image: "/sword1.jpg", bid: 3500, isDefault: true },
      { id: "default12", title: "Royal Sword", description: "Used by nobles in 1600s.", image: "/sword3.jpg", bid: 6800, isDefault: true },
    ];

    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "auctions"));
      const firestoreProducts = snapshot.docs.map((d) => ({
        id: d.id,
        title: d.data().title,
        description: d.data().description,
        image: d.data().imageURL,
        bid: d.data().currentBid ?? d.data().startBid,
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
        image: d.data().imageURL,
        bid: d.data().currentBid ?? d.data().startBid,
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
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product, i) => (
        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full h-60 object-cover" />

          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{product.title}</h3>
              <Heart
                onClick={() => toggleWishlist(product)}
                className={`w-5 h-5 cursor-pointer ${
                  wishlist.find((p) => p.id === product.id)
                    ? "text-red-500 fill-current"
                    : "text-gray-400"
                }`}
              />
            </div>

            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-red-500 font-semibold">₹{product.bid}</p>

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
              className="w-full mt-2 border px-2 py-1 rounded"
            />
            <button
              onClick={() => handleBidSubmit(i)}
              className="mt-2 w-full bg-emerald-600 text-white py-1 rounded"
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
