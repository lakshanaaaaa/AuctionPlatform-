import React, { useState } from 'react';
import axios from 'axios';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from './firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [startBid, setStartBid] = useState('');
  const [duration, setDuration] = useState(60);
  const [errorMsg, setErrorMsg] = useState('');

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!user) return alert('You must be logged in to add products.');
    if (!imageFile) return alert('Please select an image file.');

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
        imageURL,
        startBid: Number(startBid),
        currentBid: Number(startBid),
        currentBidder: '',
        bidCount: 0,
        endTime,
        status: 'active',
        createdBy: user.uid,
      });

      setTitle('');
      setDescription('');
      setImageFile(null);
      setStartBid('');
      setDuration(60);
      alert('Auction item added!');
      navigate('/product');
    } catch (error) {
      console.error('Upload or Firestore error:', error);
      setErrorMsg('Upload failed. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          🛍️ Add Auction Product
        </h2>

        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
        />

        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}

        <input
          type="number"
          placeholder="Starting Bid (₹)"
          value={startBid}
          onChange={(e) => setStartBid(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-all duration-300"
        >
          Submit Auction
        </button>
      </form>
    </div>
  );
};

export default Form;
