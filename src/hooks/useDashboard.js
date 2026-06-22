import { useState, useEffect } from 'react';

export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Future CRUD placeholders
  const fetchDashboardStats = async () => {};

  return { data, loading, error, fetchDashboardStats };
};
