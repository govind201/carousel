import React from 'react';

const useFetchAll = ({urls, token,  method = "GET"}) => {
  const [state, setState] = React.useState({
    shortTerm: [],
    mediumTerm: [],
    longTerm: [],
   loading: true});
  const isCurrent  = React.useRef(true)
 
  React.useEffect(()=>{
     return () => {
       isCurrent.current = false;
     }
  },[])

  React.useEffect(() => {
    console.log("useEffect called in useFetchAll");
    if (!urls || urls.size === 0){
      console.log("No url provided");
      return;
    }
            Promise.all(
                urls.map(
                    url =>
                        fetch(url, {
                       headers:  { Authorization: 'Bearer ' + token },
                       method: method,
                        }).then(
                            (response) => response.json()
                        ))).then(data => {
                          
                          setState({shortTerm: data[0].items, 
                            mediumTerm: data[0].items,
                             longTerm: data[0].items,
                              loading: false});
                        }).catch((error)=> console.log(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 !state.loading && console.log("state in useFetchAll", state);
  return {
     shortTerm: state.shortTerm,
     mediumTerm: state.mediumTerm,
     longTerm: state.longTerm,
     loading: state.loading
    }
};
export default useFetchAll;
