import React, { useState } from 'react';
import { X, ChevronLeft, AlertCircle } from 'lucide-react';
import ThankYouQualified from './pages/ThankYouQualified';
import ThankYouNotQualified from './pages/ThankYouNotQualified';

const QualificationModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: '',
    yearsInBusiness: '',
    annualRevenue: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    biggestChallenge: '',
    openToContact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isQualifiedUser, setIsQualifiedUser] = useState(true);
  const [errors, setErrors] = useState({});

  const totalSteps = 6;

  const openModal = () => {
    setIsOpen(true);
    setCurrentStep(1);
    setFormData({
      businessType: '',
      yearsInBusiness: '',
      annualRevenue: '',
      fullName: '',
      phoneNumber: '',
      email: '',
      biggestChallenge: '',
      openToContact: ''
    });
    setShowThankYou(false);
    setIsQualifiedUser(true);
    setErrors({});
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowThankYou(false);
    setIsQualifiedUser(true);
    setErrors({});
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.businessType) {
          newErrors.businessType = 'Please select your business type';
        }
        break;
      case 2:
        if (!formData.yearsInBusiness) {
          newErrors.yearsInBusiness = 'Please select years in business';
        }
        break;
      case 3:
        if (!formData.annualRevenue) {
          newErrors.annualRevenue = 'Please select your annual revenue';
        }
        break;
      case 4:
        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
          newErrors.fullName = 'Please enter a valid full name';
        }
        
        if (!formData.phoneNumber.trim()) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!validatePhone(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Please enter a valid phone number';
        }
        
        if (!formData.email.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;
      case 5:
        if (!formData.biggestChallenge) {
          newErrors.biggestChallenge = 'Please select your biggest challenge';
        }
        break;
      case 6:
        if (!formData.openToContact) {
          newErrors.openToContact = 'Please make a selection';
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing/selecting
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.businessType !== '';
      case 2:
        return formData.yearsInBusiness !== '';
      case 3:
        return formData.annualRevenue !== '';
      case 4:
        return formData.fullName.trim() !== '' && 
               formData.phoneNumber.trim() !== '' && 
               formData.email.trim() !== '' &&
               validateEmail(formData.email) &&
               validatePhone(formData.phoneNumber);
      case 5:
        return formData.biggestChallenge !== '';
      case 6:
        return formData.openToContact !== '';
      default:
        return false;
    }
  };

  const isQualified = () => {
    const isDisqualified = (
      formData.businessType === 'student' &&
      formData.yearsInBusiness === 'less-than-1' &&
      formData.annualRevenue === '5-10' &&
      formData.openToContact === 'no'
    );
    return !isDisqualified;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      const qualified = isQualified();
      setIsQualifiedUser(qualified);

      if (qualified) {
        console.log('Submitting qualified user data:', formData);
        
        const submissionData = {
          businessType: formData.businessType,
          yearsInBusiness: formData.yearsInBusiness,
          annualRevenue: formData.annualRevenue,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          biggestChallenge: formData.biggestChallenge,
          openToContact: formData.openToContact,
          submittedAt: new Date().toISOString(),
          qualified: true
        };
        
        console.log('Sending submission data:', submissionData);
        
        
        const response = await fetch('/.netlify/functions/submit-qualification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const result = await response.json();
        console.log('Form submitted successfully:', result);
        
      } else {
        console.log('User not qualified - data not saved:', {
          businessType: formData.businessType,
          yearsInBusiness: formData.yearsInBusiness,
          annualRevenue: formData.annualRevenue,
          openToContact: formData.openToContact
        });
      }

      setShowThankYou(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (showThankYou) {
      return isQualifiedUser ? 
        <ThankYouQualified onClose={closeModal} /> : 
        <ThankYouNotQualified onClose={closeModal} />;
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                What best describes you?
              </h3>
              <p className="text-gray-600 text-lg">Please select the option that best fits your situation</p>
            </div>
            <div className="space-y-4">
              {[
                { value: 'coach-consultant', label: "I'm a coach/consultant running my own business" },
                { value: 'service-based', label: "I run a service-based business" },
                { value: 'professional', label: "I'm a working professional exploring sales coaching" },
                { value: 'student', label: "I'm a student/fresher" }
              ].map((option) => (
                <label key={option.value} className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-pink-300 ${
                  formData.businessType === option.value 
                    ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 shadow-md' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="businessType"
                    value={option.value}
                    checked={formData.businessType === option.value}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="mr-4 w-5 h-5 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-gray-700 text-lg font-medium">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.businessType && (
              <div className="flex items-center text-red-500 text-sm mt-2">
                <AlertCircle size={16} className="mr-2" />
                {errors.businessType}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                How many years have you been running your business?
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { value: 'less-than-1', label: 'Less than 1 year' },
                { value: '1-2', label: '1-2 years' },
                { value: '2-5', label: '2-5 years' },
                { value: '5-plus', label: '5+ years' }
              ].map((option) => (
                <label key={option.value} className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-pink-300 ${
                  formData.yearsInBusiness === option.value 
                    ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 shadow-md' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="yearsInBusiness"
                    value={option.value}
                    checked={formData.yearsInBusiness === option.value}
                    onChange={(e) => handleInputChange('yearsInBusiness', e.target.value)}
                    className="mr-4 w-5 h-5 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-gray-700 text-lg font-medium">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.yearsInBusiness && (
              <div className="flex items-center text-red-500 text-sm mt-2">
                <AlertCircle size={16} className="mr-2" />
                {errors.yearsInBusiness}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                What is your current annual revenue?
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { value: '5-10', label: '₹5-10 lakhs' },
                { value: '10-25', label: '₹10-25 lakhs' },
                { value: '25-plus', label: '₹25 lakhs+' }
              ].map((option) => (
                <label key={option.value} className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-pink-300 ${
                  formData.annualRevenue === option.value 
                    ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 shadow-md' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="annualRevenue"
                    value={option.value}
                    checked={formData.annualRevenue === option.value}
                    onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                    className="mr-4 w-5 h-5 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-gray-700 text-lg font-medium">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.annualRevenue && (
              <div className="flex items-center text-red-500 text-sm mt-2">
                <AlertCircle size={16} className="mr-2" />
                {errors.annualRevenue}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Contact Information
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.fullName && (
                  <div className="flex items-center text-red-500 text-sm mt-2">
                    <AlertCircle size={16} className="mr-2" />
                    {errors.fullName}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.phoneNumber && (
                  <div className="flex items-center text-red-500 text-sm mt-2">
                    <AlertCircle size={16} className="mr-2" />
                    {errors.phoneNumber}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && (
                  <div className="flex items-center text-red-500 text-sm mt-2">
                    <AlertCircle size={16} className="mr-2" />
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                What's your biggest challenge in growing your business right now?
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { value: 'lead-qualification', label: 'Lead Qualification' },
                { value: 'lead-nurturing', label: 'Lead Nurturing' },
                { value: 'objection-handling', label: 'Objection Handling' },
                { value: 'sales-closing', label: '1:1 Sales Closing' },
                { value: 'other', label: 'Other' }
              ].map((option) => (
                <label key={option.value} className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-pink-300 ${
                  formData.biggestChallenge === option.value 
                    ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 shadow-md' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="biggestChallenge"
                    value={option.value}
                    checked={formData.biggestChallenge === option.value}
                    onChange={(e) => handleInputChange('biggestChallenge', e.target.value)}
                    className="mr-4 w-5 h-5 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-gray-700 text-lg font-medium">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.biggestChallenge && (
              <div className="flex items-center text-red-500 text-sm mt-2">
                <AlertCircle size={16} className="mr-2" />
                {errors.biggestChallenge}
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Final Step
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                If you're a good fit, are you open to being contacted for a free Sales Growth clarity call?
              </p>
            </div>
            <div className="space-y-4">
              {[
                { value: 'yes', label: "Yes, I'm open to being contacted" },
                { value: 'no', label: "No, not at this time" }
              ].map((option) => (
                <label key={option.value} className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-pink-300 ${
                  formData.openToContact === option.value 
                    ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 shadow-md' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="openToContact"
                    value={option.value}
                    checked={formData.openToContact === option.value}
                    onChange={(e) => handleInputChange('openToContact', e.target.value)}
                    className="mr-4 w-5 h-5 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-gray-700 text-lg font-medium">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.openToContact && (
              <div className="flex items-center text-red-500 text-sm mt-2">
                <AlertCircle size={16} className="mr-2" />
                {errors.openToContact}
              </div>
            )}
            <p className="text-sm text-gray-500 text-center bg-gray-50 p-4 rounded-xl">
              This gives us explicit permission for follow-up regarding your clarity call.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderProgressDots = () => {
    return (
      <div className="flex justify-center space-x-3 mb-8">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index + 1 <= currentStep 
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div onClick={openModal}>
        {children}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
           style={{
             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 100px rgba(236, 72, 153, 0.3)'
           }}>
        <div className="p-8 lg:p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Book Your Clarity Call
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={28} />
            </button>
          </div>

          {!showThankYou && renderProgressDots()}

          {renderStep()}

          {!showThankYou &&
          (
            <div className="flex justify-between items-center mt-10">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-2xl transition-all duration-300 font-semibold ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-pink-500 hover:bg-pink-50 hover:shadow-md'
                }`}
              >
                <ChevronLeft size={20} className="mr-1" />
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                  className={`px-8 py-3 rounded-2xl transition-all duration-300 font-semibold text-lg ${
                    isCurrentStepValid()
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isCurrentStepValid() || isSubmitting}
                  className={`px-8 py-3 rounded-2xl transition-all duration-300 font-semibold text-lg ${
                    isCurrentStepValid() && !isSubmitting
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QualificationModal;