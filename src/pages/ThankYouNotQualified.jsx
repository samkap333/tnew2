import React from 'react';

const ThankYouNotQualified = ({ onClose }) => {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </div>
      <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
        Thank You!
      </h3>
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          Thank you for your interest, but your data was not saved because we currently don't offer services for people with these options:
        </p>
        <div className="bg-white rounded-xl p-4 border border-orange-200">
          <ul className="text-left text-gray-600 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
              I'm a student/fresher
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
              Less than 1 year in business
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
              ₹5-10 lakhs annual revenue
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
              Not open to being contacted
            </li>
          </ul>
        </div>
      </div>
      <button
        onClick={onClose}
        className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg"
      >
        Close
      </button>
    </div>
  );
};

export default ThankYouNotQualified;