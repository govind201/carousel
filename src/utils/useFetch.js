import React from 'react';

const useFetch = ({url, token,  method = "GET"}) => {
  const [state, setState] = React.useState({ data: [], loading: true});
  // const [error, setError] = React.useState(null);
  const isCurrent  = React.useRef(true)
 
  React.useEffect(()=>{
     return () => {
       isCurrent.current = false;
     }
  },[])

  React.useEffect(() => {
    if (!url || url === null){
      console.log("No url provided");
      return;
    } 
    fetch(url, {
       headers:  { Authorization: 'Bearer ' + token },
       method: method,
    })
      .then((res) => res.json())
      .then((data) =>{
        if(isCurrent.current) {
          console.log(data);
          setState({data: data.items, loading: false})
       }
      }
     )
      .catch(error =>console.log(error)); 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
console.log("state in useFetch", state);
  return  [
    state.data,
    state.loading
  ]
};
export default useFetch;
