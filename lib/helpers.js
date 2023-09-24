export const getDateTime = () => {
  const date = new Date();
  const day = date.toDateString();
  const time = date.toLocaleTimeString();
  return day + " " + time;
};


// get the local storage
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem // check if the browser supports the setItem method
      ? localStorage.setItem(key, JSON.stringify(value)) // if it does, use it
      : null; // if it doesn't, do nothing
  }
};

//  function to get the local storage
export const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    // parse the value to JSON

    return localStorage.getItem ? JSON.parse(localStorage.getItem(key)) : "";
  }
};

// function to remove the local storage
export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem ? localStorage.removeItem(key) : null;
  }
};
