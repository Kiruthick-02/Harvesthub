import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListings, reset } from './marketplaceSlice';

const ListingCard = ({ listing }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
    <div className="w-full h-48 bg-gray-200">
      {listing.media && listing.media[0] ? (
        <img src={listing.media[0]} alt={listing.title} className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center h-full">
            <span className="text-gray-500">No Image</span>
        </div>
      )}
    </div>
    <div className="p-4">
      <h4 className="text-lg font-bold text-emerald-700">{listing.title}</h4>
      <p className="text-sm text-gray-500 capitalize mb-2">{listing.category}</p>
      <p className="text-gray-800 font-semibold text-xl">${listing.price}</p>
      <p className="text-gray-600 mt-2 truncate">{listing.description}</p>
      <p className="text-xs text-gray-400 mt-3">Seller: {listing.seller.name}</p>
    </div>
  </div>
);


const ListingList = () => {
  const dispatch = useDispatch();
  const { listings, isLoading, isError, message } = useSelector((state) => state.marketplace);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(getListings());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(filter.toLowerCase()) ||
    listing.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Marketplace</h3>
      <input
        type="text"
        placeholder="Search by title or category..."
        className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
        onChange={(e) => setFilter(e.target.value)}
      />
      {isLoading && <p>Loading listings...</p>}
      {isError && <p className="text-red-500">Error: {message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => <ListingCard key={listing._id} listing={listing} />)
        ) : (
          !isLoading && <p>No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default ListingList;