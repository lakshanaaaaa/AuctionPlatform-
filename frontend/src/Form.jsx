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
      <div className="min-h-screen bg-gray-800 py-8 px-4">
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Listing Created Successfully!</h3>
              <p className="text-slate-600">Your auction is now live. Redirecting to view your listing...</p>
            </div>
          </div>
        )}
        
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sell Your Item</h1>
            <p className="text-gray-300">Create a professional auction listing to reach thousands of potential buyers</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-700 rounded-lg shadow-sm border border-gray-600">
                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-600 pb-4">
                      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        Item Details
                      </h2>
                      <p className="text-sm text-gray-300 mt-1">Provide accurate information about your item</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                          Item Title *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Vintage Rolex Submariner Watch"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                          Category *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select category</option>
                          <option value="Antiques & Collectibles">Antiques & Collectibles</option>
                          <option value="Art & Paintings">Art & Paintings</option>
                          <option value="Jewelry & Watches">Jewelry & Watches</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Furniture">Furniture</option>
                          <option value="Books & Manuscripts">Books & Manuscripts</option>
                          <option value="Coins & Currency">Coins & Currency</option>
                          <option value="Toys & Games">Toys & Games</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Item Condition *
                      </label>
                      <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select condition</option>
                        <option value="Mint">Mint - Perfect condition, like new</option>
                        <option value="Excellent">Excellent - Minor signs of use</option>
                        <option value="Good">Good - Some wear, fully functional</option>
                        <option value="Fair">Fair - Noticeable wear but usable</option>
                        <option value="Poor">Poor - Significant wear or damage</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Description *
                      </label>
                      <textarea
                        placeholder="Provide detailed information about your item including history, provenance, measurements, materials, and any flaws or repairs..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="4"
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">Detailed descriptions attract more bidders and higher prices</p>
                    </div>
                  </div>

                  {/* Photos */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-600 pb-4">
                      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        Photos
                      </h2>
                      <p className="text-sm text-gray-300 mt-1">High-quality photos increase bidding activity</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Upload Images *
                      </label>
                      <div className="border-2 border-dashed border-gray-500 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-gray-600">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files[0])}
                          required
                          className="w-full text-gray-200"
                        />
                        <p className="text-sm text-gray-400 mt-2">Upload clear, well-lit photos from multiple angles</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Duration */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-600 pb-4">
                      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Pricing & Duration
                      </h2>
                      <p className="text-sm text-gray-300 mt-1">Set competitive pricing to attract bidders</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                          Starting Bid (₹) *
                        </label>
                        <input
                          type="number"
                          placeholder="1000"
                          value={startBid}
                          onChange={(e) => setStartBid(e.target.value)}
                          required
                          min="1"
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-400 mt-1">Lower starting bids often result in more bidding activity</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                          Reserve Price (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="Optional minimum price"
                          value={reservePrice}
                          onChange={(e) => setReservePrice(e.target.value)}
                          min="1"
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-400 mt-1">Minimum price you'll accept (optional)</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Auction Duration
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                  {/* Shipping */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-600 pb-4">
                      <h2 className="text-xl font-semibold text-white">Shipping Information</h2>
                      <p className="text-sm text-gray-300 mt-1">Help buyers understand delivery options</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Shipping Details
                      </label>
                      <textarea
                        placeholder="Describe shipping methods, costs, handling time, and any special requirements..."
                        value={shippingInfo}
                        onChange={(e) => setShippingInfo(e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="bg-red-900 border border-red-700 rounded-lg p-4">
                      <p className="text-red-300 text-sm">{errorMsg}</p>
                    </div>
                  )}

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Creating Listing...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          Create Auction Listing
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-700 rounded-lg shadow-sm border border-gray-600 p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-white mb-4">Listing Tips</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-200">Write detailed descriptions</p>
                      <p className="text-gray-400">Include materials, dimensions, age, and condition details</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-200">Use high-quality photos</p>
                      <p className="text-gray-400">Clear, well-lit images from multiple angles increase bids</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-200">Set competitive starting prices</p>
                      <p className="text-gray-400">Lower starting bids often lead to higher final prices</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-200">Choose optimal timing</p>
                      <p className="text-gray-400">7-day auctions typically get the most attention</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <h4 className="font-medium text-gray-200 mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-400">Contact our seller support team for assistance with your listing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;