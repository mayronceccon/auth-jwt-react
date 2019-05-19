export const getItem = (item) => {
  return localStorage.getItem(item);
}

export const setItem = (item, value) => {
  localStorage.setItem(item, value);
}
