import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaStar } from 'react-icons/fa';
import { GetImages } from "../helpreFunction/GetImages";
import { useContext } from "react";
import { BookContext } from "../context";

function FavoritePopup() {
  const { setShowFavoritesPopup, isInCart, handleAddToCart, handleAlertPopup, favoriteItem } = useContext(BookContext);

  return (
    <div className="relative">
      {/* Close button */}
      <div className="absolute top-2 right-3 ">
        <RxCross2 onClick={() => setShowFavoritesPopup(false)} className="text-2xl text-gray-200 cursor-pointer" />
      </div>

      {/* Favorite Items Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-[1000px] mx-auto bg-gray-800 px-4 py-6 rounded-md">
        {favoriteItem.length > 0 ? (
          favoriteItem.map((cart) => (
            <div key={cart.id} className="border border-[#595959] p-4 mt-4 mb-4 rounded shadow cursor-pointer">
              <div>
                <img src={GetImages(`../assets/images/${cart.image}`)} alt="img" className="w-full h-auto" />
              </div>
              <div>
                <h2 className="text-[12px] font-sans mt-2 text-white">{cart.name}</h2>
                <p className="text-[10px] mt-2 text-[#8C8C8C]">{cart.author}</p>
                <div className="flex items-center mb-3 mt-2">
                  {[...Array(cart.rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#00D991] ml-2" />
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleAddToCart(cart)}
                  className={`bg-[#00D991] py-2 px-6 rounded text-[#171923] ${isInCart(cart.id) ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isInCart(cart.id)}
                >
                  {isInCart(cart.id) ? "Added to Cart" : `$${cart.price} | Add to cart`}
                </button>
                <div
                  onClick={() => handleAlertPopup(cart.id)} // Trigger alert popup on click
                  className="w-8 h-8 rounded flex justify-center items-center border border-green-400 cursor-pointer"
                >
                  <MdDelete className="text-green-400 text-2xl" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-lg text-rose-500">No items in favorite</h2>
        )}
      </div>
    </div>
  );
}

export default FavoritePopup;
