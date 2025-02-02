import React, { useState } from 'react';
import './ContactPage.css';

// Live Chat
const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    setMessages([...messages, { text: userInput, sender: 'user' }]);
    setUserInput('');
    setMessages([...messages, { text: userInput, sender: 'user' }, { text: 'How can I help you?', sender: 'bot' }]);
  };

  return (
    <div className="live-chat-container">
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

// Multi-step Form for Job Applications
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', coverLetter: '' });

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h3>Step 1: Personal Details</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3>Step 2: Cover Letter</h3>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            placeholder="Write your cover letter here"
          />
          <button onClick={handlePreviousStep}>Previous</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

// File Upload
const FileUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('File Uploaded:', file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      {file && <p>Selected file: {file.name}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

// FAQ Bot (Simple FAQ Bot)
const FAQBot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const faq = {
    "What are your working hours?": "Our working hours are 9:00 AM to 6:00 PM, Monday to Friday.",
    "Where are you located?": "We are located at 1234 Main Street, City, Country.",
    "How can I contact support?": "You can contact us by email at support@company.com or through live chat."
  };

  const handleAskQuestion = () => {
    setBotResponse(faq[userMessage] || "I'm sorry, I didn't understand that. Please try asking again.");
    setUserMessage('');
  };

  return (
    <div>
      <h3>Ask Our Chatbot:</h3>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={handleAskQuestion}>Ask</button>
      <div className="chatbot-response">
        {botResponse && <p>{botResponse}</p>}
      </div>
    </div>
  );
};

// Appointment Scheduling (Calendly Integration)
const AppointmentScheduling = () => {
  return (
    <div>
      <h2>Book an Appointment with Us</h2>
      <button onClick={() => window.location.href = 'https://meet.google.com/una-vgbe-fpt'}>
        Schedule a Call
      </button>
    </div>
  );
};
// Map Component
const Map = () => {
    return (
      <div className="map-container">
        <h2>Our Location</h2>
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.5988560698992!2d36.780011688076385!3d-1.3003352712033756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b264fa4327b%3A0x4a4fd87e6260dbe!2sAdams%20Arcade!5e0!3m2!1sen!2ske!4v1738500740094!5m2!1sen!2ske" 
        width="600" 
        height="450" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    );
  };

// Main ContactPage Component
const ContactPage = () => {
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Show success message after submission
    setMessage('');
    setTimeout(() => setIsSubmitted(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="contact-page-container">
      <h1>Contact Us</h1>
      <div className="contact-sections">
        <LiveChat />
        <MultiStepForm />
        <FileUploadForm />
        <FAQBot />
        <AppointmentScheduling />
        <Map />

        {/* Contact Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            required
          />
          <textarea
            placeholder="Your Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        {isSubmitted && (
          <div className="notification">
            <p>Your request has been submitted successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;

