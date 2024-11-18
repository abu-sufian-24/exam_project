// src/App.jsx
import { useReducer, useEffect } from 'react';
import { BookContext } from './context';
import Navbar from './component/navbar/Navbar';
import MeinSection from './component/sections/MeinSection';
import ImgPopup from './component/ImgPopup';
import SearchPopup from './component/SearchPopup';
import AddToCartPopup from './component/AddToCartPopup';
import FavoritePopup from './component/FavoritePopup';
import { AlertDeletPopup } from './component/AlertDeletPopup';
import { initialState, reducer } from './reducer/Reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.showFavoritesPopup || state.openImgPopup || state.searchPopup || state.showAddToCartPopup) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => document.body.classList.remove('no-scroll');
  }, [state.showFavoritesPopup, state.openImgPopup, state.searchPopup, state.showAddToCartPopup]);

  const handleAlertPopup = (id) => {
    dispatch({ type: 'SET_ITEM_TO_DELETE', payload: id });
    dispatch({ type: 'SET_OPEN_ALERT_DELETE_POPUP', payload: true });
  };

  const confirmDelete = (isFavorite = false, isInCart = true) => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FROM_FAVORITE', payload: state.itemToDelete });
    }
    if (isInCart) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: state.itemToDelete });
    }
    dispatch({ type: 'SET_OPEN_ALERT_DELETE_POPUP', payload: false });
  };



  const handleQuantityChange = (id, amount) => {
    const cartItem = state.cartItem.find(item => item.id === id);
    if (cartItem) {
      const newQuantity = Math.max(cartItem.Quantity + amount, 1);
      dispatch({
        type: 'UPDATE_CART_ITEM',
        payload: { id, Quantity: newQuantity },
      });
    }
  };

  const handleAddToCart = (data) => {
    const addDone = state.cartItem.find(item => item.id === data.id);
    if (!addDone) {
      dispatch({ type: 'ADD_TO_CART', payload: { ...data, Quantity: 1 } });
    }
  };

  const handleAddToFavorite = (data) => {
    const isFavorite = state.favoriteItem.some(item => item.id === data.id);
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FROM_FAVORITE', payload: data.id });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITE', payload: data });
    }
  };
  const isInCart = (id) => {
    return state.cartItem.some(item => item.id === id);
  };
  const isFavorite = (id) => state.favoriteItem.some(item => item.id === id);

  const handleOpenImgPopup = (item) => {
    dispatch({ type: 'SET_SELECTED_ITEM', payload: item });
    dispatch({ type: 'SET_OPEN_IMG_POPUP', payload: true });
  };


  const provider = {
    cartItem: state.cartItem,
    isInCart,
    isFavorite,
    setCartItem: (cartItems) => dispatch({ type: 'SET_CART_ITEM', payload: cartItems }),
    favoriteItem: state.favoriteItem,
    setFavoriteItem: (favoriteItems) => dispatch({ type: 'SET_FAVORITE_ITEM', payload: favoriteItems }),
    selectedItem: state.selectedItem,
    setSelectedItem: (item) => dispatch({ type: 'SET_SELECTED_ITEM', payload: item }),
    itemToDelete: state.itemToDelete,
    setItemToDelete: (item) => dispatch({ type: 'SET_ITEM_TO_DELETE', payload: item }),
    openImgPopup: state.openImgPopup,
    setOpenImgPopup: (open) => dispatch({ type: 'SET_OPEN_IMG_POPUP', payload: open }),
    searchPopup: state.searchPopup,
    setSearchPopup: (open) => dispatch({ type: 'SET_SEARCH_POPUP', payload: open }),
    showFavoritesPopup: state.showFavoritesPopup,
    setShowFavoritesPopup: (open) => dispatch({ type: 'SET_SHOW_FAVORITES_POPUP', payload: open }),
    showAddToCartPopup: state.showAddToCartPopup,
    setShowAddToCartPopup: (open) => dispatch({ type: 'SET_SHOW_ADD_TO_CART_POPUP', payload: open }),
    openAlertDeletePopup: state.openAlertDeletePopup,
    setAlerDeletePopup: (open) => dispatch({ type: 'SET_OPEN_ALERT_DELETE_POPUP', payload: open }),
    handleAddToCart,
    handleAddToFavorite,
    handleQuantityChange,
    handleAlertPopup,
    confirmDelete,
    handleOpenImgPopup,

  };

  return (
    <div>
      <BookContext.Provider value={provider}>
        <Navbar />
        <MeinSection />

        {state.showAddToCartPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-4 rounded-lg shadow-lg relative">
              <AddToCartPopup />
            </div>
          </div>
        )}

        {state.openImgPopup && state.selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg relative">
              <ImgPopup />
            </div>
          </div>
        )}

        {state.searchPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="w-full max-w-[800px] max-h-[80vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg relative">
              <SearchPopup />
            </div>
          </div>
        )}

        {state.showFavoritesPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg relative">
              <FavoritePopup />
            </div>
          </div>
        )}

        {state.openAlertDeletePopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full max-w-[400px] max-h-[400vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg relative">
              <AlertDeletPopup />
            </div>
          </div>
        )}
      </BookContext.Provider>
    </div>
  );
}

export default App;
