import React, { useState } from "react";
import './FAQ.css'

const faqData = [
  {
    question: "What is this platform all about?",
    answer:
      "Our platform allows users to buy, rent, swap, and sell books online. Whether you're a book lover, a student, or someone looking to offload your collection, we provide a simple and secure way to connect with others.",
  },
  {
    question: "How can I buy a book on this platform?",
    answer:
      "To buy a book, simply browse through the available listings, choose the book you'd like to purchase, and proceed to checkout. You can pay via multiple secure payment methods like credit/debit cards, PayPal, or other local payment systems (like M-Pesa if supported).",
  },
  {
    question: "How can I sell a book?",
    answer:
      "Selling a book is easy! Go to the 'Sell Books' section, fill out the required details like title, author, condition, and price, and submit the listing. Once approved, your book will be visible for other users to purchase.",
  },
  {
    question: "Can I rent books instead of buying them?",
    answer:
      "Yes! We offer a rent option for many books on the platform. To rent, simply browse through the 'Rent Books' section, select the book you want, and choose your preferred rental duration. Payment for rentals is processed before delivery.",
  },
  {
    question: "How does the book swap feature work?",
    answer:
      "If you're interested in swapping books, head to the 'Swap Books' section. You can browse through books available for trade and offer your own in exchange. Once both parties agree, a swap request is created. After confirmation, the books are exchanged. It’s a great way to refresh your library!",
  },
  {
    question: "How do I sign up for an account?",
    answer:
      "Click on the 'Sign Up' button located at the top of the page. You'll need to provide your name, email address, and create a password. After signing up, you'll be able to access your user dashboard to manage your books, view messages, and track swaps.",
  },
  {
    question: "How can I log into my account?",
    answer:
      "To log in, click the 'Login' button at the top right of the homepage. Enter your registered email address and password. If you forget your password, you can reset it by clicking the 'Forgot Password?' link.",
  },
  {
    question: "Is it safe to buy and sell books here?",
    answer:
      "Yes, security is our top priority. We use encrypted payment gateways to ensure your transactions are safe. Additionally, we have a user rating system so you can read reviews and assess sellers and buyers before making a decision.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept a variety of payment methods, including: Credit and debit cards (Visa, MasterCard, etc.), PayPal, M-Pesa (for users in supported regions).",
  },
  {
    question: "How do I change my account details (e.g., email, password)?",
    answer:
      "You can update your details in the 'Profile Settings' section of your user dashboard. Here, you can change your email, password, and other account-related information.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "If you have any issues, you can contact us via our 'Contact Us' page. Alternatively, you can reach out via email at support@ourbookplatform.com, and we'll be happy to assist you.",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes, you can delete your account by going to the 'Account Settings' section. If you choose to delete your account, all your data, including book listings, purchases, and messages, will be permanently removed.",
  },
  {
    question: "How do I track my orders?",
    answer:
      "Once your book purchase or rental is confirmed, you will receive an email notification with tracking details. You can also check the status of your orders from your 'User Dashboard.'",
  },
  {
    question: "Are there any discounts or promotions available?",
    answer:
      "We regularly offer discounts, especially for new users or during holiday seasons. To stay updated, subscribe to our newsletter or check the 'Promotions' section on the homepage.",
  },
  {
    question: "How can I leave a review for a book or seller?",
    answer:
      "After purchasing or renting a book, you can leave a review on the book's page or the seller's profile. Your feedback helps others make informed decisions and ensures a great community experience.",
  },
  {
    question: "How do I update my shipping address?",
    answer:
      "You can update your shipping address in the 'Account Settings' section of your profile. Make sure your address is accurate before completing any transactions.",
  },
  {
    question: "Is there a mobile app for this platform?",
    answer:
      "Currently, we only offer a website for accessing our services. However, we're working on a mobile app that will allow you to buy, rent, swap, and sell books on the go. Stay tuned for updates!",
  },
  {
    question: "Can I donate books through the platform?",
    answer:
      "At this time, we don't have a donation feature. However, you can choose to sell or swap your books with others. We're exploring options for a donation program in the future.",
  },
  {
    question: "How long does it take to receive a book I purchased?",
    answer:
      "Delivery times vary depending on your location and the shipping method you choose during checkout. Typically, books are delivered within 3-7 business days for standard shipping.",
  },
  {
    question: "How do I report a problem with a book or transaction?",
    answer:
      "If you encounter any issues, whether with a book's condition or the transaction itself, please contact customer support through the 'Contact Us' page. We aim to resolve all issues as quickly as possible.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active question
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleAnswer(index)}
            >
              <h3>{faq.question}</h3>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
