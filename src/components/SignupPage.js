import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Calendar, Briefcase, Target, BookOpen, ArrowRight, Check, Users, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    profileDescription: '',
    useType: '',
    phoneNo: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const profileTypes = [
    'Student',
    'Developer', 
    'Writer',
    'Teacher',
    'Software Engineer',
    'Engineer',
    'Other'
  ];

  const useTypes = [
    { value: 'personal', label: 'Personal Learning' },
    { value: 'work', label: 'Work/Professional' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      if (!formData.age || formData.age < 1) newErrors.age = 'Valid age is required';
    }
    
    if (step === 2) {
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phoneNo.trim()) newErrors.phoneNo = 'Phone number is required';
      if (!formData.profileDescription) newErrors.profileDescription = 'Profile type is required';
      if (!formData.useType) newErrors.useType = 'Use type is required';
    }
    
    if (step === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    if (validateStep(3)) {
      setIsLoading(true);
      try {
        // Handle form submission here
        console.log('Form submitted:', formData);

         // Create the request payload object
        const userData = {
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          age: parseInt(formData.age),
          email_id: formData.email,
          profile_description: formData.profileDescription,
          use_type: formData.useType,
          phone_no: formData.phoneNo,
          password: formData.password
        };
        
        // Example API call:
        const response = await fetch('http://localhost:8000/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        
        if (response.ok) {
          setIsSuccess(true);
          // Optional: Redirect to login after 3 seconds
          setTimeout(() => {
            // navigate('/login-page');
          }, 3000);
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.detail || 'Registration failed. Please try again.' });
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ submit: 'Network error. Please check your connection and try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
            step < currentStep 
              ? 'bg-green-500 text-white' 
              : step === currentStep 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-500'
          }`}>
            {step < currentStep ? <Check className="w-5 h-5" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 ${
              step < currentStep ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Illustration for Step 1 - Personal Info
  const PersonalInfoIllustration = () => (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          {/* Person with ID card */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full flex items-center justify-center relative">
            {/* Person */}
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full relative">
              {/* Face */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-orange-200 rounded-full">
                {/* Eyes */}
                <div className="absolute top-2 left-1.5 w-1 h-1 bg-gray-800 rounded-full"></div>
                <div className="absolute top-2 right-1.5 w-1 h-1 bg-gray-800 rounded-full"></div>
                {/* Smile */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-1.5 border-b-2 border-gray-800 rounded-full"></div>
              </div>
              {/* Hair */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-orange-600 rounded-t-full"></div>
            </div>
            {/* ID Card */}
            <div className="absolute -right-2 -bottom-1 w-8 h-6 bg-white rounded border-2 border-gray-300">
              <div className="w-full h-2 bg-gray-200 rounded-t"></div>
              <div className="p-0.5">
                <div className="w-full h-0.5 bg-gray-400 rounded mb-0.5"></div>
                <div className="w-3/4 h-0.5 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
          {/* Welcome badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="text-center relative z-10">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Tell us about yourself</h3>
        <p className="text-gray-600 text-sm">Your personal information</p>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-3 right-3 w-3 h-3 bg-pink-400 rounded-full"></div>
      <div className="absolute bottom-3 right-6 w-4 h-4 bg-purple-300 rounded-full opacity-60"></div>
      <div className="absolute top-1/2 left-3 w-2 h-2 bg-indigo-400 rounded-full opacity-70"></div>
    </div>
  );

  // Illustration for Step 2 - Contact Info
  const ContactInfoIllustration = () => (
    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          {/* Person with devices */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-300 to-green-400 rounded-full flex items-center justify-center relative">
            {/* Person */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full relative">
              {/* Face */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-orange-200 rounded-full">
                {/* Eyes */}
                <div className="absolute top-2 left-1.5 w-1 h-1 bg-gray-800 rounded-full"></div>
                <div className="absolute top-2 right-1.5 w-1 h-1 bg-gray-800 rounded-full"></div>
                {/* Smile */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-1.5 border-b-2 border-gray-800 rounded-full"></div>
              </div>
              {/* Hair */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-brown-600 rounded-t-full bg-orange-700"></div>
            </div>
            {/* Phone */}
            <div className="absolute -right-1 top-0 w-4 h-7 bg-gray-800 rounded">
              <div className="w-full h-5 bg-blue-400 rounded-t m-0.5"></div>
            </div>
            {/* Email icon */}
            <div className="absolute -left-2 -bottom-1 w-6 h-4 bg-white rounded border border-gray-300">
              <div className="absolute top-0.5 left-0.5 right-0.5 bottom-0.5 border border-gray-400 rounded-sm">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-400"></div>
              </div>
            </div>
          </div>
          {/* Connection lines */}
          <div className="absolute top-0 left-0 w-6 h-6">
            <div className="w-0.5 h-4 bg-green-400 absolute top-1 left-3"></div>
            <div className="w-4 h-0.5 bg-green-400 absolute top-3 left-1"></div>
          </div>
        </div>
      </div>
      
      <div className="text-center relative z-10">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Stay connected</h3>
        <p className="text-gray-600 text-sm">Contact & profile details</p>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full"></div>
      <div className="absolute bottom-3 right-6 w-4 h-4 bg-emerald-300 rounded-full opacity-60"></div>
      <div className="absolute top-1/2 left-3 w-2 h-2 bg-teal-400 rounded-full opacity-70"></div>
    </div>
  );

  // Illustration for Step 3 - Security
  const SecurityIllustration = () => (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          {/* Shield with lock */}
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center relative">
            {/* Shield */}
            <div className="w-16 h-18 bg-gradient-to-br from-red-400 to-red-500 rounded-t-full relative" style={{clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 50% 100%, 0% 50%)'}}>
              {/* Lock */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-gray-700 rounded-b-lg">
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-3 border-2 border-gray-700 rounded-t-full bg-transparent"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-300 rounded"></div>
              </div>
            </div>
            {/* Key */}
            <div className="absolute -right-1 -top-1 w-3 h-6 bg-yellow-600 rounded-t-full">
              <div className="absolute bottom-0 right-0 w-1.5 h-2 bg-yellow-600"></div>
              <div className="absolute bottom-1 right-0 w-1 h-0.5 bg-yellow-600"></div>
            </div>
          </div>
          {/* Security badges */}
          <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
      
      <div className="text-center relative z-10">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Secure your account</h3>
        <p className="text-gray-600 text-sm">Create a strong password</p>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-3 right-3 w-3 h-3 bg-yellow-400 rounded-full"></div>
      <div className="absolute bottom-3 right-6 w-4 h-4 bg-orange-300 rounded-full opacity-60"></div>
      <div className="absolute top-1/2 left-3 w-2 h-2 bg-red-400 rounded-full opacity-70"></div>
    </div>
  );

  // Success Illustration
  const SuccessIllustration = () => (
    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8 relative overflow-hidden">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          {/* Celebration person */}
          <div className="w-32 h-32 bg-gradient-to-br from-green-300 to-green-400 rounded-full flex items-center justify-center relative">
            {/* Person celebrating */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full relative">
              {/* Face */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-orange-200 rounded-full">
                {/* Eyes - happy */}
                <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                {/* Big smile */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-full"></div>
              </div>
              {/* Hair */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-14 h-8 bg-orange-600 rounded-t-full"></div>
              {/* Arms up celebrating */}
              <div className="absolute -top-1 -left-2 w-3 h-8 bg-orange-400 rounded-full transform -rotate-45"></div>
              <div className="absolute -top-1 -right-2 w-3 h-8 bg-orange-400 rounded-full transform rotate-45"></div>
            </div>
            {/* Trophy */}
            <div className="absolute bottom-0 w-12 h-8 bg-yellow-400 rounded-t-lg flex items-end justify-center">
              <div className="w-6 h-6 bg-yellow-500 rounded-full mb-1"></div>
            </div>
          </div>
          {/* Confetti */}
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-pink-400 rounded-full"></div>
          <div className="absolute -top-4 left-4 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
          <div className="absolute -right-4 top-8 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -left-3 top-4 w-1 h-1 bg-green-400 rounded-full"></div>
        </div>
      </div>
      
      <div className="text-center relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to StudyMind!</h3>
        <p className="text-gray-600">Your learning journey begins now</p>
      </div>
      
      {/* More confetti */}
      <div className="absolute top-4 right-8 w-3 h-3 bg-purple-400 rounded-full"></div>
      <div className="absolute bottom-6 right-4 w-2 h-2 bg-pink-300 rounded-full opacity-60"></div>
      <div className="absolute top-1/3 left-4 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-70"></div>
    </div>
  );

  const renderStep1 = () => (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Illustration */}
      <div className="order-2 lg:order-1">
        <PersonalInfoIllustration />
        
        {/* Mini feature cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
            <div className="w-8 h-8 bg-purple-200 rounded-lg mb-2 flex items-center justify-center">
              <User className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xs font-medium text-gray-800">Personal Profile</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-3 border border-indigo-100">
            <div className="w-8 h-8 bg-indigo-200 rounded-lg mb-2 flex items-center justify-center">
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-xs font-medium text-gray-800">Join Community</p>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="order-1 lg:order-2 space-y-6">
        <div className="text-center lg:text-left mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's get to know you</h2>
          <p className="text-gray-600">Tell us about yourself to get started</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your first name"
              />
            </div>
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your last name"
              />
            </div>
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Choose a unique username"
            />
          </div>
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your age"
              min="1"
              max="120"
            />
          </div>
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Illustration */}
      <div className="order-2 lg:order-1">
        <ContactInfoIllustration />
        
        {/* Mini feature cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
            <div className="w-8 h-8 bg-green-200 rounded-lg mb-2 flex items-center justify-center">
              <Mail className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs font-medium text-gray-800">Email Updates</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
            <div className="w-8 h-8 bg-blue-200 rounded-lg mb-2 flex items-center justify-center">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-gray-800">Stay Connected</p>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="order-1 lg:order-2 space-y-6">
        <div className="text-center lg:text-left mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact & Profile</h2>
          <p className="text-gray-600">Help us customize your experience</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.phoneNo ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Type</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="profileDescription"
              value={formData.profileDescription}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white ${
                errors.profileDescription ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select your profile type</option>
              {profileTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          {errors.profileDescription && <p className="text-red-500 text-sm mt-1">{errors.profileDescription}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How will you use StudyMind?</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useTypes.map((type) => (
              <div
                key={type.value}
                onClick={() => handleInputChange({ target: { name: 'useType', value: type.value } })}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.useType === type.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Target className={`w-5 h-5 ${
                    formData.useType === type.value ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    formData.useType === type.value ? 'text-purple-900' : 'text-gray-700'
                  }`}>
                    {type.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {errors.useType && <p className="text-red-500 text-sm mt-1">{errors.useType}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Illustration */}
      <div className="order-2 lg:order-1">
        <SecurityIllustration />
        
        {/* Mini feature cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-3 border border-yellow-100">
            <div className="w-8 h-8 bg-yellow-200 rounded-lg mb-2 flex items-center justify-center">
              <Eye className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-xs font-medium text-gray-800">Secure Login</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-3 border border-red-100">
            <div className="w-8 h-8 bg-red-200 rounded-lg mb-2 flex items-center justify-center">
              <Check className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-xs font-medium text-gray-800">Data Protection</p>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="order-1 lg:order-2 space-y-6">
        <div className="text-center lg:text-left mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Your Account</h2>
          <p className="text-gray-600">Create a strong password to protect your account</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-4 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full pl-4 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
          <h4 className="font-semibold text-purple-900 mb-2">Password Requirements:</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>At least 6 characters long</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${formData.password === formData.confirmPassword && formData.password ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>Passwords match</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">StudyMind</span>
            </div>
            <div className="text-sm text-gray-600">
              Already have an account? 
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium ml-1">Sign In</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          {isSuccess ? (
            // Success Message
            <div className="text-center py-8">
              <div className="max-w-md mx-auto mb-8">
                <SuccessIllustration />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to StudyMind! 🎉</h2>
              <p className="text-gray-600 mb-6">
                Your account has been created successfully. You can now start tracking your study sessions and achieve your learning goals.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 mb-6">
                <p className="text-green-800 font-medium">
                  Redirecting to login page in a few seconds...
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/login'}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <>
              {renderStepIndicator()}
              
              <div>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                
                {/* Error Message */}
                {errors.submit && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-700 text-sm">{errors.submit}</p>
                  </div>
                )}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-purple-300 hover:text-purple-600 transition-all"
                      disabled={isLoading}
                    >
                      Previous
                    </button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center space-x-2 shadow-lg"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating Account...</span>
                          </>
                        ) : (
                          <>
                            <span>Create Account</span>
                            <Check className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Terms */}
        <div className="text-center mt-6 text-sm text-gray-600">
          By creating an account, you agree to our{' '}
          <Link to="#" className="text-purple-600 hover:text-purple-700">Terms of Service</Link>
          {' '}and{' '}
          <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage