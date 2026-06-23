import { useState, useEffect } from 'react';

export const useEmployees = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Future CRUD placeholders
  const fetchEmployees = async () => {};

  return { data, loading, error, fetchEmployees };
};
