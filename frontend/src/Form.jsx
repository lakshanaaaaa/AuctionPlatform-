import React, { useState } from 'react';
import axios from 'axios';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from './firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Upload, Clock, DollarSign, FileText, Tag, Camera, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';

const Form = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [startBid, setStartBid] = useState('');
  const [reservePrice, setReservePrice] = useState('');
  const [duration, setDuration] = useState(60);
  const [shippingInfo, setShippingInfo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    if (!user) {
      alert('You must be logged in to list items for auction.');
      setIsSubmitting(false);
      return;
    }
    if (!imageFile) {
      setErrorMsg('Please upload at least one image of your item.');
      setIsSubmitting(false);
      return;
    }
    if (!category || !condition) {
      setErrorMsg('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'auction_unsigned_preset');
      formData.append('folder', 'auctions');

      const cloudRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dw5z7d8f1/image/upload',
        formData
      );

      const imageURL = cloudRes.data.secure_url;
      const endTime = Timestamp.fromDate(new Date(Date.now() + duration * 60000));

      await addDoc(collection(db, 'auctions'), {
        title,
        description,
        category,
        condition,
        imageURL,
        startBid: Number(startBid),
        reservePrice: reservePrice ? Number(reservePrice) : null,
        currentBid: Number(startBid),
        currentBidder: '',
        bidCount: 0,
        endTime,
        shippingInfo,
        status: 'active',
        createdBy: user.uid,
        createdAt: Timestamp.now(),
      });

      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setCondition('');
      setImageFile(null);
      setStartBid('');
      setReservePrice('');
      setDuration(60);
      setShippingInfo('');
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/product');
      }, 2000);
    } catch (error) {
      console.error('Upload or Firestore error:', error);
      setErrorMsg('Failed to list your item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Success!</h3>
              <p className="text-slate-600">Your item has been listed for auction. Redirecting to products...</p>
            </div>
          </div>
        )}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-slate-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Upload className="w-8 h-8" />
              List Your Item for Auction
            </h1>
            <p className="text-slate-300 mt-2">Fill out the details below to create your auction listing</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Item Details Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">Item Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <Tag className="w-4 h-4" /> Item Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Vintage Rolex Watch, Antique Vase..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="antiques">Antiques & Collectibles</option>
                    <option value="art">Art & Paintings</option>
                    <option value="jewelry">Jewelry & Watches</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="books">Books & Manuscripts</option>
                    <option value="coins">Coins & Currency</option>
                    <option value="toys">Toys & Games</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <FileText className="w-4 h-4" /> Detailed Description *
                </label>
                <textarea
                  placeholder="Describe your item's history, condition, unique features, provenance, etc. Be detailed to attract serious bidders."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Item Condition *</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select condition</option>
                  <option value="mint">Mint - Perfect condition</option>
                  <option value="excellent">Excellent - Minor wear</option>
                  <option value="good">Good - Some wear, fully functional</option>
                  <option value="fair">Fair - Noticeable wear</option>
                  <option value="poor">Poor - Significant wear/damage</option>
                </select>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">Item Photos</h3>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Camera className="w-4 h-4" /> Upload High-Quality Images *
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-slate-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                    className="w-full text-slate-700"
                  />
                  <p className="text-sm text-slate-500 mt-2">Upload clear, well-lit photos from multiple angles. High-quality images get more bids!</p>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">Auction Settings</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <DollarSign className="w-4 h-4" /> Starting Bid Amount (₹) *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 1000"
                    value={startBid}
                    onChange={(e) => setStartBid(e.target.value)}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-slate-500 mt-1">Set a competitive starting price to attract bidders</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <DollarSign className="w-4 h-4" /> Reserve Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Optional minimum selling price"
                    value={reservePrice}
                    onChange={(e) => setReservePrice(e.target.value)}
                    min="1"
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-slate-500 mt-1">Minimum price you'll accept (optional)</p>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Clock className="w-4 h-4" /> Auction Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={60}>1 Hour</option>
                  <option value={180}>3 Hours</option>
                  <option value={360}>6 Hours</option>
                  <option value={720}>12 Hours</option>
                  <option value={1440}>1 Day</option>
                  <option value={4320}>3 Days</option>
                  <option value={10080}>7 Days</option>
                </select>
              </div>
            </div>

            {/* Shipping Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">Shipping & Delivery</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Shipping Information</label>
                <textarea
                  placeholder="Describe shipping options, costs, handling time, and any special requirements..."
                  value={shippingInfo}
                  onChange={(e) => setShippingInfo(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{errorMsg}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating Auction...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    List Item for Auction
                  </>
                )}
              </button>
              <p className="text-xs text-slate-500 text-center mt-2">
                By listing this item, you agree to our terms of service and seller policies.
              </p>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default Form;
