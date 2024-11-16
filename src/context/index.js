import { createContext } from 'react';

const BookContext = createContext({
  cartItem: [],
  setCartItem: () => {},
  favoriteItem: [],
  setFavoriteItem: () => {},
  selectedItem: {},
  setSelectedItem: () => {},
  itemToDelete: {},
  setItemToDelete: () => {},
});

export { BookContext };
