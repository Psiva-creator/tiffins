import { useState, useEffect } from 'react';

export const useCustomers = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Future CRUD placeholders
  const fetchCustomers = async () => {};

  return { data, loading, error, fetchCustomers };
};
