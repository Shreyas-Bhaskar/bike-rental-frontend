// TransactionHistoryPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthHeader } from '../api/utils';
import './TransactionPage.css'

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://stingray-app-eibd8.ondigitalocean.app/bike_rental/get_payment_history/', {
          headers: getAuthHeader(),
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleBookClick = () => {
    navigate('/MapPage'); // Assuming '/MapPage' is the correct path to the map page
  };

  const handleDelete = async (transactionId) => {
    try {
      const response = await axios.post('https://stingray-app-eibd8.ondigitalocean.app/bike_rental/delete_transaction/', {
      
          "transaction_id": transactionId
        },{
        headers: getAuthHeader()
        
      });
      if (response.status === 200) {
        // Refresh the transactions list
        setTransactions(transactions.filter(transaction => transaction.TransactionID !== transactionId));
      }
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  return (
    <div>
      <h2>Ride History</h2>
      <table>
        <thead>
          <tr>
            <th>Cost</th>
            <th>Bike ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Start Station</th>
            <th>End Station</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.TransactionID}>
              <td>{transaction.Cost}</td>
              <td>{transaction.BikeID}</td>
              <td>{transaction.start_time}</td>
              <td>{transaction.end_time}</td>
              <td>{transaction.start_station}</td>
              <td>{transaction.end_station}</td>
              <td>
        <button onClick={() => handleDelete(transaction.TransactionID)}>Delete</button>
      </td> 
            </tr>
          ))}
        </tbody>
      </table>
      <button align = 'center' onClick={handleBookClick}>Book</button>
    </div>
  );
};

export default TransactionHistoryPage;