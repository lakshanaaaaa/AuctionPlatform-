import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase/firebase";
import dayjs from "dayjs";

const Sell = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "auctions"), orderBy("endTime", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    });

    return () => unsub();
  }, []);

  const getTimeLeft = (endTime) => {
    const diff = dayjs(endTime.toDate()).diff(dayjs());
    if (diff <= 0) return "Auction Ended";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-xl p-4 shadow-md bg-white">
          <img
            src={product.imageURL}
            alt={product.title}
            className="w-full h-60 object-cover rounded-md"
          />
          <h2 className="text-lg font-bold mt-2">{product.title}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-md font-semibold mt-2">💰 ₹{product.currentBid}</p>
          <p className="text-sm text-gray-500">
            {product.bidCount} bids ·{" "}
            <span className="text-red-500">
              {getTimeLeft(product.endTime)}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Sell;
