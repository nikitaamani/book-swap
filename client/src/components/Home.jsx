import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Main Banner */}
      <div className="main-banner" style={{ backgroundImage: 'url("https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/fde6db79-9011-4179-7231-093078124f00/public")' }}>
        <div className="banner-content">
          <h2>Exchange Books, Save Money, and Connect</h2>
          <h4>JOIN OUR BOOK SWAP COMMUNITY</h4>
          <p>
            Discover the joy of exchanging books with fellow book lovers. Save money, find new reads, and connect with like-minded individuals. Whether you want to swap, sell, or rent books, our platform makes it easy and fun. Get started today!
          </p>
          <button>GET STARTED TODAY</button>
        </div>
      </div>
      
      {/* Secondary Section */}
      <div className="secondary-section">
        <div className="secondary-content">
          <div className="image-container">
            <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/6fbaf88a-d912-41b5-9ac5-fbd14cb9ab00/public" alt="Book Swap" />
          </div>
          <div className="text-container">
            <h2>Unlock a World of Books: Sell, Rent, and Swap</h2>
            <h4>BECOME PART OF THE BOOK SWAP HUB COMMUNITY</h4>
            <p>
              Experience the joy of sharing literature through our innovative platform.
            </p>
            <div className="stats">
              <div>
                <h3>1000+</h3>
                <p>Books Available</p>
              </div>
              <div>
                <h3>Our Commitment</h3>
                <p>We foster a vibrant community where every book finds a new reader.</p>
              </div>
            </div>
            <button>JOIN US NOW</button>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="community-section">
        <div className="community-content">
          <h2>Join a Thriving Community of Book Lovers</h2>
          <p>
            Embrace the excitement of selling, renting, and swapping books with fellow book lovers. Our platform empowers you to declutter your shelves while discovering new stories and expanding your literary collection. Share your insights, thoughts, reviews, and recommendations with a community that shares your passion for reading.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-grid">
          <Feature title="Effortless Book Selling" description="List your books for sale quickly and easily, reaching eager readers looking for their next great find. Enjoy a user-friendly interface designed for hassle-free transactions." />
          <Feature title="Seamless Book Swapping" description="Swap your cherished titles with others effortlessly. Our platform connects you with fellow readers, making it simple to exchange books and explore new genres together." />
          <Feature title="Convenient Book Rentals" description="Browse our extensive catalog of rental books at competitive rates. Find your favorite titles without the commitment of purchase and return them with ease." />
          <Feature title="Share Your Reviews" description="Contribute to our community by leaving reviews for books you've sold, rented, or swapped. Your insights help others discover new reads." />
          <Feature title="Build Lasting Connections" description="Join a community of passionate readers who share your love for books. Engage in discussions, participate in events, and forge friendships that go beyond the pages." />
          <Feature title="Embrace Sustainability" description="Participate in eco-friendly practices by opting for second-hand books. Reduce waste while enjoying the stories you love and helping others do the same." />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
      <div className="footer-content">
  <p>Discover, Share, and Connect Through Books</p>
          <div className="image-gallery">
            <div className="image-card">
              <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/a4f35c5f-b165-4d60-642c-f7569af7ea00/publicContain" alt="Book 1" />
            </div>
            <div className="image-card">
              <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/2423cf70-2b4a-498d-5788-1f3822138a00/public" alt="Book 2" />
            </div>
            <div className="image-card">
              <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/3662daca-7431-4ef8-2aae-0d80645bd300/public" alt="Book 3" />
            </div>
            <div className="image-card">
              <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/80a3197f-2b47-4fef-6755-6e676bcb5100/public" alt="Book 4" />
            </div>
            <div className="image-card">
              <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/6bd076ec-54fa-4e44-a476-42e5aaaa4400/public" alt="Book 5" />
            </div>
            <div className="image-card">
              <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/496cf246-deb9-48fe-f511-b544ac018a00/public" alt="Book 6" />
            </div>
          </div>
          <p class='p'>Explore a curated gallery of our community's beloved books, showcasing titles waiting for new homes. Each image represents not just a book, but a story ready to be shared through rent or swap. Engage with fellow book lovers, leave your reviews, and make meaningful connections as you browse through our vibrant selection.</p>

        </div>

      </footer>
      
    </div>

  );
};

const Feature = ({ title, description }) => (
  <div className="feature">
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

export default Home;
