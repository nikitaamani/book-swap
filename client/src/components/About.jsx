import React from "react";
import "./About.css"; 

const About = () => {
  return (
    <section className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="font-black sm:text-[50px] text-[40px] tracking-tight text-center">About Us</h2>
      </div>
      <div className="mt-12 max-w-screen-xl mx-auto grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Welcome to Book Swap</h2>
          <p className="mt-4 text-gray-600 text-lg text-justify">
            "Welcome to Book-Swap, a vibrant community where avid readers come together to share the joy of discovering new worlds through literature..."
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Our Story</h2>
          <p className="mt-4 text-gray-600 text-lg text-justify">
            "Book-Swap was born out of a shared passion for books and a desire to build a community of avid readers who believe in the power of sharing stories..."
          </p>
        </div>
      </div>
      <div className="mt-16 max-w-screen-xl mx-auto grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">What We Stand For</h2>
            <ul className="mt-4 text-gray-600 text-lg list-disc pl-6 text-justify">
              <li><strong>Community:</strong> We're building a tight-knit community of book enthusiasts...</li>
              <li><strong>Sustainability:</strong> By sharing and reusing books, we're making a positive impact...</li>
              <li><strong>Discovery:</strong> Explore a vast world of literature right at your fingertips...</li>
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">Future Updates</h2>
            <p className="mt-4 text-gray-600 text-lg text-justify">
              At Book-Swap, we're committed to continuously improving your book-swapping experience...
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">How It Works</h2>
          <ol className="mt-4 text-gray-600 text-lg list-decimal pl-6 text-justify">
            <li><strong>Authentication:</strong> Before you start your book-swapping journey...</li>
            <li><strong>Book-Store Exploration:</strong> Once authenticated, you'll find yourself in our vibrant book-store...</li>
            <li><strong>Detailed Book Views:</strong> Clicking on a book card takes you to a detailed view...</li>
            <li><strong>User Profiles:</strong> Interested in learning more about the person behind the book?</li>
          </ol>
        </div>
      </div>
      <div className="mt-16 max-w-screen-xl mx-auto grid gap-4 md:grid-cols-2">
        <img className="w-full h-full object-cover rounded-lg" src="https://res.cloudinary.com/dnp36kqdc/image/upload/v1694810969/pexels-olena-bohovyk-3646172_kp9qwk.jpg" alt="office content 1" />
        <img className="mt-4 w-full h-full lg:mt-10 object-cover rounded-lg" src="https://res.cloudinary.com/dnp36kqdc/image/upload/v1694810969/pexels-marta-dzedyshko-2067569_edrtp4.jpg" alt="office content 2" />
      </div>
    </section>
  );
};

export default About;
