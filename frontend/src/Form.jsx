import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from "./firebase"; // ✅ correct
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [startBid, setStartBid] = useState('');
  const [duration, setDuration] = useState(60);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('You must be logged in to add products.');

    try {
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

      // Reset form
      setTitle('');
      setDescription('');
      setImageURL('');
      setStartBid('');
      setDuration(60);

      alert('Auction item added!');
      navigate('/sell'); // ✅ 3. Navigate to product page

    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Something went wrong. Check console.');
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
        type="url"
        placeholder="Image URL"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
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