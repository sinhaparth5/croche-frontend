import React, { useState } from 'react';
import { api } from '../../utils/api';
import type { RegisterData, UserDetails } from '../../types';

// Define form field types
type FormField = {
  name: string;
  label: string;
  type: string;
  pattern?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
};

const RegisterForm = () => {
  // Define form state type
  type FormDataType = {
    name: string;
    email: string;
    password: string;
    details: {
      address: string;
      city: string;
      pincode: string;
      country: string;
      phone: string;
    };
  };

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    details: {
      address: "",
      city: "",
      pincode: "",
      country: "",
      phone: ""
    }
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'name' || name === 'email' || name === 'password') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          [name]: value
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Transform formData to match RegisterData type
      const submissionData: RegisterData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        details: {
          address: formData.details.address || undefined,
          city: formData.details.city || undefined,
          country: formData.details.country || undefined,
          phone: formData.details.phone || undefined,
          pincode: formData.details.pincode ? parseInt(formData.details.pincode) : undefined
        }
      };

      // Remove empty optional fields
      if (submissionData.details) {
        Object.entries(submissionData.details).forEach(([key, value]) => {
          if (!value) {
            delete submissionData.details![key as keyof UserDetails];
          }
        });

        // Remove details object if empty
        if (Object.keys(submissionData.details).length === 0) {
          delete submissionData.details;
        }
      }

      await api.register(submissionData);
      window.location.href = '/login';
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('Invalid value provided. Expected Int')) {
          setError('Please enter a valid pincode (numbers only)');
        } else {
          setError(err.message);
        }
      } else {
        setError('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // Field configurations
  const requiredFields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' }
  ];

  const optionalFields: FormField[] = [
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { 
      name: 'pincode', 
      label: 'Pincode', 
      type: 'text', 
      pattern: '[0-9]*', 
      inputMode: 'numeric' 
    },
    { name: 'country', label: 'Country', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'tel' }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mx-4">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-4">
          Register
        </h2>
        
        {error && (
          <div className="text-red-500 mb-4 text-center p-3 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Required Fields */}
          {requiredFields.map(field => (
            <div key={field.name}>
              <label 
                className="block text-sm font-semibold mb-1" 
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData.details[field.name as keyof FormDataType['details']]}
                onChange={handleChange}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>
          ))}

          {/* Optional Details Fields */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Additional Details (Optional)
            </h3>
            {optionalFields.map(field => (
              <div key={field.name} className="mb-4">
                <label 
                  className="block text-sm font-semibold mb-1" 
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  pattern={field.pattern}
                  inputMode={field.inputMode}
                  value={formData.details[field.name as keyof typeof formData.details]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-pink-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;