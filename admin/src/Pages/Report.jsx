import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

const Report = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendUrl +'/api/hitech/product/track');
        setProducts(response.data.products || []);
        setFilteredProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterProducts(e.target.value, startDate, endDate);
  };

  const handleDateChange = (e, dateType) => {
    if (dateType === 'start') {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
    filterProducts(searchTerm, dateType === 'start' ? e.target.value : startDate, dateType === 'start' ? endDate : e.target.value);
  };

  const filterProducts = (term, start, end) => {
    let filtered = products;
    if (term) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(term.toLowerCase()));
    }
    if (start && end) {
      filtered = filtered.filter(product => new Date(product.date) >= new Date(start) && new Date(product.date) <= new Date(end));
    }
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <p className="text-black text-center">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg ">
      <h1 className="text-3xl font-bold mb-6 text-black">Product Report</h1>
      <div className="flex flex-col mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search Product"
          value={searchTerm}
          onChange={handleSearch}
          className="p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e, 'start')}
            className="p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(e, 'end')}
            className="p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <table className="min-w-full table-auto bg-white border-collapse rounded-lg s">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-5 text-left text-black font-semibold">Product</th>
            <th className="py-3 px-5 text-left text-black font-semibold">Total Quantity</th>
            <th className="py-3 px-5 text-left text-black font-semibold">Total Sold Quantity</th>
            <th className="py-3 px-5 text-left text-black font-semibold">Remaining Quantity</th>
            <th className="py-3 px-5 text-left text-black font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className="border-b border-gray-300">
              <td className="py-3 px-5 text-black">{product.name}</td>
              <td className="py-3 px-5 text-black">{product.totalQuantity}</td>
              <td className="py-3 px-5 text-black">{product.totalSoldQuantity}</td>
              <td className="py-3 px-5 text-black">{product.remainQuantity}</td>
              <td className="py-3 px-5 text-black">{new Date(product.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
