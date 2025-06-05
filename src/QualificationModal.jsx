"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle } from "lucide-react"

const SimpleQualificationModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    identity: "",
    revenue: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [showThankYou, setShowThankYou] = useState(false)
  const [isQualifiedUser, setIsQualifiedUser] = useState(true)

  // Math captcha state
  const [mathQuestion, setMathQuestion] = useState({ question: "", answer: 0 })
  const [userAnswer, setUserAnswer] = useState("")
  const [mathError, setMathError] = useState("")

  // Generate random math question
  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 9) + 1 // 1-9
    const num2 = Math.floor(Math.random() * 9) + 1 // 1-9
    const answer = num1 * num2

    setMathQuestion({
      question: `${num1} × ${num2}`,
      answer: answer,
    })
  }

  useEffect(() => {
    if (isOpen) {
      generateMathQuestion()
    }
  }, [isOpen])

  const openModal = () => {
    setIsOpen(true)
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      identity: "",
      revenue: "",
    })
    setUserAnswer("")
    setMathError("")
    setShowThankYou(false)
    setIsQualifiedUser(true)
    setErrors({})
    generateMathQuestion()
  }

  const closeModal = () => {
    setIsOpen(false)
    setShowThankYou(false)
    setIsQualifiedUser(true)
    setErrors({})
    setUserAnswer("")
    setMathError("")
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const validateForm = () => {
    const newErrors = {}
    let localMathError = ""

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter a valid name"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.identity) {
      newErrors.identity = "Please select how you identify yourself"
    }

    if (!formData.revenue) {
      newErrors.revenue = "Please select your yearly revenue"
    }

    // Math check
    if (!userAnswer.trim()) {
      localMathError = "Please solve the math question"
    } else if (Number.parseInt(userAnswer) !== mathQuestion.answer) {
      localMathError = "Incorrect answer. Please try again."
      generateMathQuestion()
      setUserAnswer("")
    }

    setMathError(localMathError)
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0 && localMathError === ""
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field when user starts typing/selecting
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleMathAnswerChange = (value) => {
    setUserAnswer(value)
    if (mathError) {
      setMathError("")
    }
  }

  const isQualified = () => {
    // Unqualified: Working Professional, Student/Fresher, or revenue less than 10 lakh
    const unqualifiedIdentities = ["working-professional", "student-fresher"]
    const unqualifiedRevenue = ["less-than-10"]

    return !unqualifiedIdentities.includes(formData.identity) && !unqualifiedRevenue.includes(formData.revenue)
  }

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const qualified = isQualified();
      setIsQualifiedUser(qualified);
  
      console.log("Submitting form data:", formData);
      console.log("User qualified:", qualified);
  
      // Send data to Netlify function
      const response = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Form submission result:', result);
  
      if (result.success) {
        console.log(qualified ? "Data saved to Google Sheets" : "User not qualified - data not saved");
      } else {
        throw new Error(result.message || 'Submission failed');
      }
  
      setShowThankYou(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.identity !== "" &&
      formData.revenue !== "" &&
      validateEmail(formData.email) &&
      validatePhone(formData.phoneNumber) &&
      userAnswer.trim() !== ""
    )
  }

  const renderThankYou = () => {
    if (isQualifiedUser) {
      return (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Congratulations! You're Qualified
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Thank you for your submission. Our team will contact you soon for your clarity call.
          </p>
          <button
            onClick={closeModal}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Close
          </button>
        </div>
      )
    } else {
      return (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
            Thank You for Your Interest
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Thank you for your submission. At this time, our program may not be the best fit for your current situation.
          </p>
          <button
            onClick={closeModal}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Close
          </button>
        </div>
      )
    }
  }

  if (!isOpen) {
    return <div onClick={openModal}>{children}</div>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 100px rgba(236, 72, 153, 0.3)",
        }}
      >
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

          {showThankYou ? (
            renderThankYou()
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                  Tell us about yourself
                </h3>
                <p className="text-gray-600 text-lg">Please fill in your details below</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
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
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg ${
                      errors.email ? "border-red-500" : "border-gray-300"
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

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Phone no. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
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
                    How do you identify yourself <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.identity}
                    onChange={(e) => handleInputChange("identity", e.target.value)}
                    className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg ${
                      errors.identity ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="">Select your identity</option>
                    <option value="coach-consultant">Coach/Consultant</option>
                    <option value="service-provider">Service Provider</option>
                    <option value="working-professional">Working Professional</option>
                    <option value="student-fresher">Student/Fresher</option>
                  </select>
                  {errors.identity && (
                    <div className="flex items-center text-red-500 text-sm mt-2">
                      <AlertCircle size={16} className="mr-2" />
                      {errors.identity}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    What is your yearly revenue? <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => handleInputChange("revenue", e.target.value)}
                    className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg ${
                      errors.revenue ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="">Select your yearly revenue</option>
                    <option value="less-than-10">Less than 10 lakh</option>
                    <option value="10-25">10-25 Lakh</option>
                    <option value="25-50">25-50 Lakh</option>
                    <option value="50-1cr">50L - 1 Cr</option>
                  </select>
                  {errors.revenue && (
                    <div className="flex items-center text-red-500 text-sm mt-2">
                      <AlertCircle size={16} className="mr-2" />
                      {errors.revenue}
                    </div>
                  )}
                </div>

                {/* Math Captcha */}
                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Calculate <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-600 mb-3">Please solve this simple math problem for verification:</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-gray-800">{mathQuestion.question} = </span>
                    <input
                      type="number"
                      placeholder="?"
                      value={userAnswer}
                      onChange={(e) => handleMathAnswerChange(e.target.value)}
                      className={`w-20 p-3 border-2 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-300 text-lg text-center ${
                        mathError ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {mathError && (
                    <div className="flex items-center text-red-500 text-sm mt-2">
                      <AlertCircle size={16} className="mr-2" />
                      {mathError}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-10">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  className={`px-12 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg ${
                    isFormValid() && !isSubmitting
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SimpleQualificationModal