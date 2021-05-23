import React from 'react';

const useFetch = (url, method, headers) => {
  const [state, setState] = React.useState({ data: '', dataFromAPI: [] });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!url) return;
    fetch(url, {
      headers: headers,
      method: method,
    })
      .then((res) => res.json())
      .then((data) =>
        setState((prevState) => ({
          ...prevState,
          dataFromAPI: data,
        })).then(() => setLoading(false))
      )
      .catch(setError);
  }, [url, headers, method]);

  return {
    state,
    loading,
    error,
  };
};
export default useFetch;
