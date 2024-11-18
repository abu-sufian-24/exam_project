import { IoNotifications } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import DarkMode from "./DarkMode";
import { useContext } from "react";
import { BookContext } from "../../context";

const Navbar = () => {

  const { setShowAddToCartPopup, cartItem } = useContext(BookContext)
  return (
    <nav className=" bg-gray-800 px-4 py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-24 ml-20 md:ml-0">
        <a className=" hidden md:block text-xl md:text-2xl font-bold text-divineGreen">DivineBook</a>
        <div className="flex items-center space-x-3 md:space-x-5">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-customGreen rounded flex justify-center items-center border-[#91EFD0]">
            <IoNotifications className="text-divineGreen text-xl md:text-2xl" />
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-customGreen rounded flex justify-center items-center border-[#91EFD0]">
            <DarkMode />
          </div>
          <div onClick={() => setShowAddToCartPopup(true)} className="w-8 h-8 md:w-10 md:h-10 bg-customGreen rounded flex justify-center items-center border-[#91EFD0] cursor-pointer relative">
            <BsCart3 className="text-divineGreen text-xl md:text-2xl" />
            <div className="absolute top-0 left-7 bg-white rounded-full w-5 h-5 flex items-center justify-center">
              <span className="text-rose-700  text-xs">{cartItem.length}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
