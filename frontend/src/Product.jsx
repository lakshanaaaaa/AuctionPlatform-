import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebase";
import CountdownTimer from "./CountdownTimer";

function Product() {
  const defaultProducts = [
    {
      id: "default1",
      title: "EUREKA",
      description: "Rare vintage piece from 1800s.",
      image: "/antique1.jpg",
      bid: 3000,
    },
    {
      id: "default2",
      title: "Antique Toy",
      description: "Classic toy from the 70s.",
      image: "/toy1.jpg",
      bid: 1500,
    },
    {
      id: "default3",
      title: "Historic Coin",
      description: "Pre-independence era coin.",
      image: "/coin1.jpg",
      bid: 800,
    },
    {
      id: "default4",
      title: "War Sword",
      description: "Handcrafted medieval sword.",
      image: "/sword2.jpg",
      bid: 7500,
    },
    {
      id: "default5",
      title: "Old Vase",
      description: "Royal antique ceramic vase.",
      image: "/antique2.jpg",
      bid: 2000,
    },
    {
      id: "default6",
      title: "Vintage Toy Car",
      description: "Limited edition model.",
      image: "/toy3.jpg",
      bid: 1200,
    },
    {
      id: "default7",
      title: "Silver Coin",
      description: "Ancient silver currency.",
      image: "/coin2.jpg",
      bid: 950,
    },
    {
      id: "default8",
      title: "Antique Phone",
      description: "Retro dialer in mint condition.",
      image: "/antique3.jpg",
      bid: 2700,
    },
    {
      id: "default9",
      title: "Wooden Toy",
      description: "Hand-carved toy from Kerala.",
      image: "/toy2.jpg",
      bid: 1000,
    },
    {
      id: "default10",
      title: "Bronze Coin",
      description: "From ancient temple discovery.",
      image: "/coin3.jpg",
      bid: 1100,
    },
    {
      id: "default11",
      title: "Decorative Sword",
      description: "Wall decor piece, engraved.",
      image: "/sword1.jpg",
      bid: 3500,
    },
    {
      id: "default12",
      title: "Royal Sword",
      description: "Used by nobles in 1600s.",
      image: "/sword3.jpg",
      bid: 6800,
    },
  ];

  const [products, setProducts] = useState(defaultProducts);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchFirestoreProducts = async () => {
      const snapshot = await getDocs(collection(db, "auctions"));
      const firestoreProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        image: doc.data().imageURL,
        bid: doc.data().currentBid || doc.data().startBid,
      }));

      const merged = [...defaultProducts, ...firestoreProducts];
      setProducts(merged);
      setBids(Array(merged.length).fill(""));
    };

    fetchFirestoreProducts();
  }, []);

  const handleBidChange = (value, i) => {
    const updated = [...bids];
    updated[i] = value;
    setBids(updated);
  };

  const handleBidSubmit = (i) => {
    const enteredBid = parseInt(bids[i], 10);
    if (!isNaN(enteredBid) && enteredBid > products[i].bid) {
      const updatedProducts = [...products];
      updatedProducts[i].bid = enteredBid;
      setProducts(updatedProducts);
      setBids((prev) => {
        const cleared = [...prev];
        cleared[i] = "";
        return cleared;
      });
    } else {
      alert("Enter a valid higher bid.");
    }
  };

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product, i) => (
        <div
          key={product.id || i}
          className="relative group bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300">
          {/* Extra description (appears above image on hover) */}
          <div className="absolute top-2 left-2 right-2 text-sm text-white bg-black bg-opacity-70 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p>🔍 Exclusive collectible item. Don’t miss it!</p>
          </div>
          {/* Image */}
          <div className="overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          {/* Bid form (appears below image on hover) */}
          <div className="px-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <input
              type="number"
              placeholder="Enter your bid"
              value={bids[i] || ""}
              onChange={(e) => handleBidChange(e.target.value, i)}
              className="mb-2 w-full px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleBidSubmit(i)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-1 rounded"
            >
              Submit Bid
            </button>
          </div>
          {/* Always visible product details */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 mb-1">{product.description}</p>
            <p className="text-red-500 font-semibold mb-1">
              Current Bid: ₹{product.bid}
            </p>
            <CountdownTimer initialMinutes={60} initialSeconds={0} />
          </div>
        </div>
      ))}
    </div>
  );
}
export default Product;