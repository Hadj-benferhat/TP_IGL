import { useState, useEffect, useMemo } from 'react';

const useFetch = (url, token) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const headers = useMemo(() => {
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }, [token]);

  useEffect(() => {
    setIsPending(true);
    if (!url) return;

    const fetchData = async () => {
      try {
        const res = await fetch(url, {   
          headers: {
            'Content-Type': 'application/json',
            ...headers 
          }
        });

        if (!res.ok) {
          throw Error('Impossible de récupérer les données pour cette ressource');
        }
        const data = await res.json();
        setData(data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };

    fetchData();
  }, [url, headers]);

  return { data, isPending, error };
};
export default useFetch;