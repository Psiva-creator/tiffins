import { useState, useEffect } from 'react';

export const useOrders = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Future CRUD placeholders
  const fetchOrders = async () => {};
  const createOrder = async () => {};
  const updateOrder = async () => {};
  const deleteOrder = async () => {};

  return { data, loading, error, fetchOrders, createOrder, updateOrder, deleteOrder };
};
