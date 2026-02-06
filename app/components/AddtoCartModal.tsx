import Image from "next/image";
import React from "react";

interface AddtoCartModalProps {
  setShowModal: (value: boolean) => void;
}
const AddtoCartModal: React.FC<AddtoCartModalProps> = ({ setShowModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all scale-100">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors p-1"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* ------------------------ */}

        {/* Cute Cartoon Image */}
        <div className="flex justify-center mb-4">
          <Image
            src="/checkout-images/add-to-cart.png"
            alt="Success"
            width={800}
            height={800}
            className="w-32 h-32 object-contain"
          />
        </div>

        <h3 className="text-2xl font-bold text-stone-900 mb-2">
          Yay! Added to Cart
        </h3>
        <p className="text-stone-600 mb-6">
          Your item is waiting for you in the bag.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-stone-800"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => (window.location.href = "/checkout")}
            className="w-full text-stone-500 py-2 text-sm font-semibold underline underline-offset-4 hover:text-stone-800"
          >
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddtoCartModal;
