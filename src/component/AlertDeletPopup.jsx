import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useContext } from "react";
import { BookContext } from "../context";

export function AlertDeletPopup() {
  const { confirmDelete, setAlerDeletePopup } = useContext(BookContext);

  return (
    <div className="max-w-[400px] max-h-[300px] mx-auto p-4 bg-gray-800">
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this product?
        </h3>
        <div className="flex justify-center gap-4">
          <button onClick={confirmDelete} className="bg-red-700 py-2 px-4 text-white rounded-md shadow-sm">
            {"Yes, I'm sure"}
          </button>
          <button onClick={() => setAlerDeletePopup(false)} className="bg-white py-2 px-4 rounded-md shadow-lg">
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
}
