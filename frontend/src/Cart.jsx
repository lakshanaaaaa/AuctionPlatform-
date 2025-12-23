import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ShoppingCart, Trophy, Clock, AlertCircle, Package } from 'lucide-react';
import Navbar from './Navbar';

const Cart = () => {
  const [user] = useAuthState(auth);
  const [userBids, setUserBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Create a collection to track user bids
    const bidsQuery = query(
      collection(db, 'userBids'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(bidsQuery, async (snapshot) => {
      const bids = [];
      
      for (const bidDoc of snapshot.docs) {
        const bidData = bidDoc.data();
        
        // Get current auction data
        const auctionRef = doc(db, 'auctions', bidData.auctionId);
        const auctionSnap = await getDoc(auctionRef);
        
        if (auctionSnap.exists()) {
          const auctionData = auctionSnap.data();
          const now = new Date();
          const endTime = auctionData.endTime.toDate();
          const isEnded = now > endTime;
          
          bids.push({
            id: bidDoc.id,
            ...bidData,
            auction: {
              id: auctionSnap.id,
              ...auctionData,
              isEnded,
              timeRemaining: isEnded ? 0 : Math.max(0, endTime - now)
            }
          });
        }
      }
      
      // Sort by bid time (most recent first)
      bids.sort((a, b) => b.bidTime.toDate() - a.bidTime.toDate());
      setUserBids(bids);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const getBidStatus = (bid) => {
    const { auction, bidAmount } = bid;
    
    if (!auction.isEnded) {
      if (auction.currentBidder === user.uid) {
        return { status: 'leading', message: 'You are currently winning!', color: 'text-green-500', icon: Trophy };
      } else {
        return { status: 'outbid', message: 'You have been outbid', color: 'text-red-500', icon: AlertCircle };
      }
    } else {
      if (auction.currentBidder === user.uid) {
        return { status: 'won', message: 'Congratulations! You won this auction', color: 'text-green-500', icon: Trophy };
      } else {
        return { status: 'lost', message: 'Auction ended - You did not win', color: 'text-red-500', icon: AlertCircle };
      }
    }
  };

  const formatTimeRemaining = (milliseconds) => {
    if (milliseconds <= 0) return 'Ended';
    
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Please Login</h2>
          <p className="text-slate-600">You need to be logged in to view your cart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8" />
            My Auction Activity
          </h1>
          <p className="text-slate-600">Track your bids and auction results</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg p-8 text-center border border-slate-200">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your auction activity...</p>
          </div>
        ) : userBids.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-slate-200">
            <ShoppingCart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Bids Yet</h3>
            <p className="text-slate-600 mb-4">You haven't placed any bids on auctions yet.</p>
            <a
              href="/product"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Browse Auctions
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {userBids.map((bid) => {
              const status = getBidStatus(bid);
              const StatusIcon = status.icon;
              
              return (
                <div key={bid.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={bid.auction.imageURL}
                          alt={bid.auction.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1 truncate">
                          {bid.auction.title}
                        </h3>
                        <p className="text-sm text-slate-500 mb-2">
                          Category: {bid.auction.category}
                        </p>
                        
                        {/* Bid Information */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-slate-500">Your Bid</p>
                            <p className="text-slate-800 font-semibold">₹{bid.bidAmount}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Current Bid</p>
                            <p className="text-slate-800 font-semibold">₹{bid.auction.currentBid}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Total Bids</p>
                            <p className="text-slate-800 font-semibold">{bid.auction.bidCount || 0}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Time Left</p>
                            <p className="text-slate-800 font-semibold flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTimeRemaining(bid.auction.timeRemaining)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex-shrink-0">
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                          status.status === 'won' ? 'bg-green-50 border border-green-200' :
                          status.status === 'leading' ? 'bg-green-50 border border-green-200' :
                          status.status === 'outbid' ? 'bg-yellow-50 border border-yellow-200' :
                          'bg-red-50 border border-red-200'
                        }`}>
                          <StatusIcon className={`w-4 h-4 ${status.color}`} />
                          <span className={`text-sm font-medium ${status.color}`}>
                            {status.status === 'won' ? 'WON' :
                             status.status === 'leading' ? 'LEADING' :
                             status.status === 'outbid' ? 'OUTBID' :
                             'LOST'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Message */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm ${status.color} flex items-center gap-2`}>
                          <StatusIcon className="w-4 h-4" />
                          {status.message}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {status.status === 'won' && (
                            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              Proceed to Payment
                            </button>
                          )}
                          {(status.status === 'outbid' || status.status === 'leading') && !bid.auction.isEnded && (
                            <a
                              href="/product"
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                            >
                              Place New Bid
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;