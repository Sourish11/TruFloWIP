import { useState } from 'react';
import { Modal, ModalHeader, ModalContent } from './Modal';
import { Card, CardContent } from './Card';
import { Button } from './Button';
import { Input } from './Input';

const steps = [
  {
    title: 'Welcome to TruFlo! 🎯',
    subtitle: 'Let\'s personalize your productivity experience',
    fields: [
      { name: 'name', label: 'What should we call you?', type: 'text', placeholder: 'Enter your name' }
    ]
  },
  {
    title: 'Your Goals 🚀',
    subtitle: 'What do you want to achieve?',
    fields: [
      { name: 'goals', label: 'Primary Goals', type: 'textarea', placeholder: 'e.g., Build better habits, increase focus, reduce distractions...' }
    ]
  },
  {
    title: 'Work Schedule ⏰',
    subtitle: 'When are you most productive?',
    fields: [
      { name: 'workHours', label: 'Typical Work Hours', type: 'select', options: [
        { value: 'early', label: '6 AM - 2 PM (Early Bird)' },
        { value: 'standard', label: '9 AM - 5 PM (Standard)' },
        { value: 'late', label: '12 PM - 8 PM (Afternoon)' },
        { value: 'night', label: '6 PM - 2 AM (Night Owl)' },
        { value: 'flexible', label: 'Flexible Schedule' }
      ]}
    ]
  },
  {
    title: 'Focus Preferences 🧠',
    subtitle: 'How do you like to work?',
    fields: [
      { name: 'focusLength', label: 'Preferred Focus Session Length', type: 'select', options: [
        { value: '15', label: '15 minutes (Quick bursts)' },
        { value: '25', label: '25 minutes (Pomodoro)' },
        { value: '45', label: '45 minutes (Deep work)' },
        { value: '90', label: '90 minutes (Flow state)' }
      ]}
    ]
  },
  {
    title: 'Mood Detection 😊',
    subtitle: 'Help us understand how you\'re feeling',
    fields: [
      { name: 'moodDetection', label: 'Enable Camera/Mic Mood Detection?', type: 'radio', options: [
        { value: 'yes', label: 'Yes, use camera/mic for automatic mood detection' },
        { value: 'no', label: 'No, I\'ll manually select my mood' }
      ]}
    ]
  }
];

export default function OnboardingModal({ isOpen, onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    goals: '',
    workHours: '',
    focusLength: '',
    moodDetection: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      onComplete(formData);
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-2xl mx-auto">
        <Card className="glass-enhanced shadow-2xl border-2 border-white/20">
          <ModalHeader>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2 font-heading">
                {currentStepData.title}
              </h2>
              <p className="text-white/80 font-body">
                {currentStepData.subtitle}
              </p>
            </div>
          </ModalHeader>
          
          <ModalContent className="p-8">
            {/* Progress dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-purple-400 scale-125'
                      : index < currentStep
                      ? 'bg-green-400'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Form fields */}
            <div className="space-y-6 mb-8">
              {currentStepData.fields.map((field) => (
                <div key={field.name}>
                  {field.type === 'text' && (
                    <Input
                      label={field.label}
                      type="text"
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                    />
                  )}
                  
                  {field.type === 'textarea' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/90">
                        {field.label}
                      </label>
                      <textarea
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 glass-button rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 placeholder-white/60 text-white resize-none"
                      />
                    </div>
                  )}
                  
                  {field.type === 'select' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/90">
                        {field.label}
                      </label>
                      <select
                        value={formData[field.name]}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 glass-button rounded-lg text-white"
                      >
                        <option value="">Select an option</option>
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value} className="bg-gray-800">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {field.type === 'radio' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/90 mb-4">
                        {field.label}
                      </label>
                      <div className="space-y-3">
                        {field.options.map((option) => (
                          <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={field.name}
                              value={option.value}
                              checked={formData[field.name] === option.value}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              className="mt-1 w-4 h-4 text-purple-600 bg-transparent border-white/30 focus:ring-purple-500"
                            />
                            <span className="text-white/90 text-sm leading-relaxed">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={currentStep === 0 ? 'invisible' : ''}
              >
                ← Back
              </Button>
              
              <Button
                onClick={handleNext}
                className="px-8"
              >
                {isLastStep ? 'Complete Setup' : 'Next →'}
              </Button>
            </div>
          </ModalContent>
        </Card>
      </div>
    </Modal>
  );
}