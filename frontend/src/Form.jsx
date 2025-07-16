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
      // ✅ Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'auction_unsigned_preset'); // your preset
      formData.append('folder', 'auctions'); // your folder

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl space-y-4">
      <h2 className="text-xl font-bold">Add Auction Product</h2>

      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        required
        className="w-full p-2 border rounded"
      />
      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <input
        type="number"
        placeholder="Starting Bid"
        value={startBid}
        onChange={(e) => setStartBid(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit Auction
      </button>
    </form>
  );
};

export default Form;
