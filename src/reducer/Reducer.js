// src/reducer/Reducer.js
const initialState = {
  cartItem: [],
  favoriteItem: [],
  selectedItem: null,
  itemToDelete: null,
  openImgPopup: false,
  searchPopup: false,
  showFavoritesPopup: false,
  showAddToCartPopup: false,
  openAlertDeletePopup: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ITEM':
      return { ...state, selectedItem: action.payload };
    case 'SET_CART_ITEM':
      return { ...state, cartItem: action.payload };
    case 'SET_FAVORITE_ITEM':
      return { ...state, favoriteItem: action.payload };
    case 'SET_ITEM_TO_DELETE':
      return { ...state, itemToDelete: action.payload };
    case 'SET_OPEN_IMG_POPUP':
      return { ...state, openImgPopup: action.payload };
    case 'SET_SEARCH_POPUP':
      return { ...state, searchPopup: action.payload };
    case 'SET_SHOW_FAVORITES_POPUP':
      return { ...state, showFavoritesPopup: action.payload };
    case 'SET_SHOW_ADD_TO_CART_POPUP':
      return { ...state, showAddToCartPopup: action.payload };
    case 'SET_OPEN_ALERT_DELETE_POPUP':
      return { ...state, openAlertDeletePopup: action.payload };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cartItem: state.cartItem.map(item =>
          item.id === action.payload.id
            ? { ...item, Quantity: action.payload.Quantity }
            : item
        ),
      };
    case 'ADD_TO_CART':
      return { ...state, cartItem: [...state.cartItem, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItem: state.cartItem.filter(item => item.id !== action.payload),
      };
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favoriteItem: [...state.favoriteItem, action.payload],
      };
    case 'REMOVE_FROM_FAVORITE':
      return {
        ...state,
        favoriteItem: state.favoriteItem.filter(
          item => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export { initialState, reducer };
