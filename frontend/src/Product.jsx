import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, onSnapshot, addDoc, Timestamp } from "firebase/firestore";
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
        // For default products, just update local state
        const updated = [...products];
        updated[i] = { ...product, bid: enteredBid };
        setProducts(updated);
      } else {
        // For Firestore products, update database
        const productRef = doc(db, "auctions", product.id);
        await updateDoc(productRef, {
          currentBid: enteredBid,
          currentBidder: user.uid,
          bidCount: (product.bidCount || 0) + 1,
        });
      }

      // Track user bid in userBids collection
      await addDoc(collection(db, "userBids"), {
        userId: user.uid,
        auctionId: product.id,
        bidAmount: enteredBid,
        bidTime: Timestamp.now(),
        productTitle: product.title,
        productImage: product.image,
      });
      
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
    <div className="min-h-screen bg-gray-50">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, i) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors hover:shadow-xl">
            <img src={product.image} alt={product.title} className="w-full h-60 object-cover" />

            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900">{product.title}</h3>
                <Heart
                  onClick={() => toggleWishlist(product)}
                  className={`w-5 h-5 cursor-pointer ${
                    wishlist.find((p) => p.id === product.id)
                      ? "text-red-500 fill-current"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                />
              </div>

              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-xs text-gray-500 mb-1">Category: {product.category || 'Antiques'}</p>
              <p className="text-xs text-gray-500 mb-1">Condition: {product.condition || 'Excellent'}</p>
              <p className="text-emerald-600 font-semibold text-lg">₹{product.bid}</p>
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
                className="w-full mt-2 bg-gray-50 border border-gray-300 px-2 py-1 rounded text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleBidSubmit(i)}
                className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition-colors font-medium"
              >
                Submit Bid
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1">
              <h3 className="text-gray-900 font-semibold text-lg mb-4">AuctionHub</h3>
              <p className="text-gray-600 text-sm mb-4">Your trusted marketplace for authentic antiques and collectibles.</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-sm">24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-sm">Free Item Appraisals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-sm">Global Shipping Available</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-gray-900 font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">How to Bid</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Selling Guide</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Authentication</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Shipping Info</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-gray-900 font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            {/* Trust & Security */}
            <div>
              <h4 className="text-gray-900 font-medium mb-4">Trust & Security</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-sm">Secure Payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 text-sm">Verified Sellers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-600 text-sm">Expert Authentication</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 AuctionHub. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-500 text-sm">Secure payments by</span>
              <div className="flex space-x-2">
                <svg className="w-8 h-5" viewBox="0 0 38 24" fill="none">
                  <rect width="38" height="24" rx="4" fill="#1434CB"/>
                  <path d="M14 8h4v8h-4V8z" fill="white"/>
                  <path d="M20 8c-2.2 0-4 1.8-4 4s1.8 4 4 4c2.2 0 4-1.8 4-4s-1.8-4-4-4z" fill="#EB001B"/>
                </svg>
                <svg className="w-8 h-5" viewBox="0 0 38 24" fill="none">
                  <rect width="38" height="24" rx="4" fill="#0070BA"/>
                  <path d="M8 8h6v8H8V8zm8 0h6v8h-6V8zm8 0h6v8h-6V8z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Product;
