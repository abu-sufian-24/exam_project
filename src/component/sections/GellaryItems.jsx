import { FaStar } from 'react-icons/fa';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { GetImages } from '../../helpreFunction/GetImages';
import { BookData } from '../../data/BookData';
import { useContext, useMemo } from 'react';
import { BookContext } from '../../context';

function GellaryItems({ filter }) {
  const {
    setSelectedItem,
    setOpenImgPopup,
    cartItem,
    setCartItem,
    favoriteItem,
    setFavoriteItem,
  } = useContext(BookContext);

  const bookData = BookData();


  const filteredData = useMemo(() => {
    let data = [...bookData];

    if (filter === 'name') {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === 'rating') {
      return data.sort((a, b) => b.rating - a.rating);
    } else if (filter === 'price') {
      return data.sort((a, b) => a.price - b.price);
    } else if (
      filter === 'new_releases' ||
      filter === 'coming_soon' ||
      filter === 5
    ) {
      return data.filter(
        item => item.status === filter || item.rating === filter
      );
    }

    return data;
  }, [bookData, filter]);

  const isInCart = id => cartItem.some(item => item.id === id);
  const isFavorite = id => favoriteItem.some(item => item.id === id);

  const onAdd = gelary => {
    if (!isInCart(gelary.id)) {
      setCartItem([...cartItem, { ...gelary, Quantity: 1 }]);
    }
  };

  // const onRemoveFromCart = gelary => {
  //   setCartItem(cartItem.filter(item => item.id !== gelary.id));
  // };

  const onIncreaseQuantity = gelary => {
    setCartItem(
      cartItem.map(item =>
        item.id === gelary.id ? { ...item, Quantity: item.Quantity + 1 } : item
      )
    );
  };

  const onDecreaseQuantity = (gelary) => {
    setCartItem(
      cartItem.map(item =>
        item.id === gelary.id
          ? { ...item, Quantity: Math.max(item.Quantity - 1, 1) }
          : item
      )
    );
  };

  const onAddToFavorite = gelary => {
    if (isFavorite(gelary.id)) {
      setFavoriteItem(favoriteItem.filter(item => item.id !== gelary.id));
    } else {
      setFavoriteItem([...favoriteItem, gelary]);
    }
  };

  const handleImageClick = item => {
    setSelectedItem(item);
    setOpenImgPopup(true);
  };

  return (
    <div className="col-span-8 order-2 sm:order-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border px-4 z-50">
        {filteredData.map(gelary => (
          <div
            key={gelary.id}
            className="border border-[#595959] dark:border-divineGreen p-4 mt-2 mb-2 rounded shadow cursor-pointer"
          >
            <div onClick={() => handleImageClick(gelary)}>
              <img
                className="w-full h-auto"
                src={GetImages(`../assets/images/${gelary.image}`)}
                alt={gelary.name || 'Book image'}
              />
            </div>
            <div>
              <h2 className="text-[12px] mt-2 text-white dark:text-gray-800">
                {gelary.name}
              </h2>
              <p className="text-[10px] mt-2 text-[#8C8C8C]">{gelary.author}</p>
              <div className="flex items-center mb-3 mt-2">
                {[...Array(gelary.rating || 0)].map((_, i) => (
                  <FaStar key={i} className="text-[#00D991] ml-2" />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              {isInCart(gelary.id) ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onDecreaseQuantity(gelary)}
                    className="bg-[#00D991] py-2 px-4 rounded text-[#171923]"
                    aria-label={`Decrease quantity of ${gelary.name}`}
                  >
                    -
                  </button>
                  <span className="text-sm">{gelary.Quantity}</span>
                  <button
                    onClick={() => onIncreaseQuantity(gelary)}
                    className="bg-[#00D991] py-2 px-4 rounded text-[#171923] "
                    aria-label={`Increase quantity of ${gelary.name}`}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onAdd(gelary)}
                  className={`bg-[#00D991] py-2 px-6 rounded text-[#171923]`}
                  aria-label={`Add ${gelary.name} to cart`}
                >
                  ${gelary.price} | Add to cart
                </button>
              )}
              <div
                onClick={() => onAddToFavorite(gelary)}
                className="cursor-pointer w-8 h-8 rounded flex justify-center items-center border border-green-400 relative"
                aria-label={
                  isFavorite(gelary.id)
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
              >
                {isFavorite(gelary.id) ? (
                  <MdFavorite className="text-red-500 text-2xl" />
                ) : (
                  <MdOutlineFavoriteBorder className="text-divineGreen text-2xl" />
                )}

                {/* Display Quantity if item is in cart */}
                {isInCart(gelary.id) && cartItem.find(item => item.id === gelary.id).Quantity > 0 && (
                  <span className="absolute top-[-92px] right-[-15px] bg-white text-rose-600 dark:bg-gray-800 dark:text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItem.find(item => item.id === gelary.id).Quantity}
                  </span>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GellaryItems;
