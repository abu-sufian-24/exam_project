
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import { BookContext } from "../context";

function ImgPopup() {
  const { selectedItem, setOpenImgPopup, isFavorite, handleAddToFavorite, isInCart, handleAddToCart } = useContext(BookContext);

  if (!selectedItem) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="max-w-4xl mx-auto bg-[#1E293B] p-4 md:grid md:grid-cols-12 gap-y-4 rounded-lg">
        <div className="md:col-span-8">
          <h2 className="text-2xl md:text-4xl font-sans mt-4 md:mt-[66px] md:ml-20 text-white">
            {selectedItem.name}
          </h2>
          <p className="text-sm md:text-[16px] mt-2 md:ml-20 text-[#8C8C8C]">{selectedItem.author}</p>
          <p className="text-sm md:text-[16px] mt-4 md:ml-20 text-[#8C8C8C]">
            {selectedItem.description}
          </p>

          <div className="flex items-center mb-3 mt-2 md:ml-20">
            {[...Array(selectedItem.rating)].map((_, i) => (
              <FaStar key={i} className="text-[#00D991] ml-2" />
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center md:justify-between mt-4 md:ml-20 space-y-4 md:space-y-0">
            <button
              onClick={() => handleAddToCart(selectedItem)}
              className={`bg-[#00D991] py-2 px-6 rounded text-[#171923] ${isInCart(selectedItem.id) ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isInCart(selectedItem.id)}
            >
              {isInCart(selectedItem.id) ? "Added to Cart" : `$${selectedItem.price} | Add to cart`}
            </button>
            <div onClick={() => handleAddToFavorite(selectedItem)} className="w-8 h-8 rounded flex justify-center items-center border border-green-400 cursor-pointer">
              {isFavorite(selectedItem.id) ? <MdFavorite className="text-red-500 text-2xl" /> : <MdOutlineFavoriteBorder className="text-divineGreen text-2xl" />}
            </div>
            <button onClick={() => setOpenImgPopup(false)} className="py-2 px-4 md:py-[10px] md:px-[33px] bg-slate-50 rounded md:mr-24">
              Close
            </button>
          </div>
        </div>

        <div className="md:col-span-4 mt-4 md:mt-0">
          <img className="w-full rounded-lg" src={selectedItem.image} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default ImgPopup;
