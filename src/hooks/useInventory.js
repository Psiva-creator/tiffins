import { useState, useEffect } from 'react';

export const useInventory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Future CRUD placeholders
  const fetchInventory = async () => {};
  const updateStock = async () => {};

  return { data, loading, error, fetchInventory, updateStock };
};
