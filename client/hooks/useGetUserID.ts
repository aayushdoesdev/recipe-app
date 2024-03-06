export const useGetUserID = () => {
  if (typeof window === 'undefined') {
    // Handle non-browser environment
    return null; // or throw an error, depending on your use case
  }
  return window.localStorage.getItem("userID");
};