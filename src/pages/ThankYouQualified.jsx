import React from 'react';

const ThankYouQualified = ({ onClose }) => {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
        Thank You!
      </h3>
      <p className="text-gray-600 mb-8 text-lg leading-relaxed">
        Thank you for your interest in our clarity call. We'll review your submission and get back to you soon.
      </p>
      <button
        onClick={onClose}
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg"
      >
        Close
      </button>
    </div>
  );
};

export default ThankYouQualified;