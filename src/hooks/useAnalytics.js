import { useState, useEffect } from 'react';

export const useAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Future CRUD placeholders
  const fetchAnalytics = async () => {};

  return { data, loading, error, fetchAnalytics };
};
