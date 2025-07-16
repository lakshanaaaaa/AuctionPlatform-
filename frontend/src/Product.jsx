import React from "react";
import CountdownTimer from "./CountdownTimer";

function Product() {
  const products = [
    {
      title: "EUREKA",
      description: "Rare vintage piece from 1800s.",
      image: "/antique1.jpg",
      bid: "₹3,000",
    },
    {
      title: "Antique Toy",
      description: "Classic toy from the 70s.",
      image: "/toy1.jpg",
      bid: "₹1,500",
    },
    {
      title: "Historic Coin",
      description: "Pre-independence era coin.",
      image: "/coin1.jpg",
      bid: "₹800",
    },
    {
      title: "War Sword",
      description: "Handcrafted medieval sword.",
      image: "/sword2.jpg",
      bid: "₹7,500",
    },
    {
      title: "Old Vase",
      description: "Royal antique ceramic vase.",
      image: "/antique2.jpg",
      bid: "₹2,000",
    },
    {
      title: "Vintage Toy Car",
      description: "Limited edition model.",
      image: "/toy3.jpg",
      bid: "₹1,200",
    },
    {
      title: "Silver Coin",
      description: "Ancient silver currency.",
      image: "/coin2.jpg",
      bid: "₹950",
    },
    {
      title: "Antique Phone",
      description: "Retro dialer in mint condition.",
      image: "/antique3.jpg",
      bid: "₹2,700",
    },
    {
      title: "Wooden Toy",
      description: "Hand-carved toy from Kerala.",
      image: "/toy2.jpg",
      bid: "₹1,000",
    },
    {
      title: "Bronze Coin",
      description: "From ancient temple discovery.",
      image: "/coin3.jpg",
      bid: "₹1,100",
    },
    {
      title: "Decorative Sword",
      description: "Wall decor piece, engraved.",
      image: "/sword1.jpg",
      bid: "₹3,500",
    },
    {
      title: "Royal Sword",
      description: "Used by nobles in 1600s.",
      image: "/sword3.jpg",
      bid: "₹6,800",
    },
  ];

  const productCards = [];

  let index = 0;
  for (const product of products) {
    productCards.push(
      <div key={index} className="bg-white shadow-lg rounded-lg p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-60 w-full object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-bold text-gray-800">{product.title}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-green-600 font-semibold">Initial Bid: {product.bid}</p>
        <CountdownTimer initialMinutes={70} initialSeconds={0} />
      </div>
    );
    index++;
  }

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {productCards}
    </div>
  );
}

export default Product;
