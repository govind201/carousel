import { useRef, useCallback, useEffect } from 'react';
// const useIsMounted = () => {
//   const isMounted = React.useRef(false);
//   React.useEffect(() => {
//     isMounted.current = false;
//     return () => {
//       isMounted.current = true;
//     };
//   });
//   return React.useCallback(() => isMounted.current, []);
// };

// export default useIsMounted;
function useIsMounted() {
  const isMountedRef = useRef(true);
  const isMounted = useCallback(() => isMountedRef.current, []);

  useEffect(() => {
    return () => void (isMountedRef.current = false);
  }, []);

  return isMounted;
}
export default useIsMounted;
