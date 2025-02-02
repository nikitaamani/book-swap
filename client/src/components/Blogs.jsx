import React from 'react';

const Blog = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>The Ultimate Guide to Book Swapping</h1>
        <p style={styles.date}>Published on: February 1, 2025</p>
      </header>

      <section style={styles.content}>
        <h2 style={styles.subTitle}>What is Book Swapping?</h2>
        <p>
          Book swapping is a wonderful way to exchange books with friends, family, and fellow readers. It helps you find new books to read without spending money, while also giving your old books a new life. In today's post, we'll discuss the benefits of book swapping and how to get started.
        </p>

        <h3 style={styles.subHeading}>Benefits of Book Swapping</h3>
        <ul>
          <li>Save money on new books</li>
          <li>Promote sustainability by recycling books</li>
          <li>Discover new genres and authors</li>
          <li>Build a community of readers</li>
        </ul>

        <h3 style={styles.subHeading}>How to Get Started with Book Swapping</h3>
        <p>
          Getting started with book swapping is easy! Here’s how you can begin:
        </p>
        <ol>
          <li>Find a local book swap group or online platform.</li>
          <li>Start exchanging books you no longer need or want.</li>
          <li>Set guidelines such as the condition of books and swap preferences.</li>
          <li>Have fun and share recommendations with others!</li>
        </ol>

        <h3 style={styles.subHeading}>Top Platforms for Book Swapping</h3>
        <p>Here are some of the most popular book swapping platforms:</p>
        <ul>
          <li>BookMooch</li>
          <li>PaperBackSwap</li>
          <li>Swap.com</li>
          <li>Little Free Library (for local swaps)</li>
        </ul>

        <h2 style={styles.subTitle}>Join the Book Swap Community!</h2>
        <p>
          Whether you’re looking for a specific book or just want to try something new, book swapping is a fun and eco-friendly way to expand your library. It’s also a great way to meet other book lovers and share your passion for reading.
        </p>
      </section>

      <footer style={styles.footer}>
        <p>Written by: Your Name</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
  },
  date: {
    color: '#777',
    fontSize: '1rem',
  },
  content: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#444',
  },
  subTitle: {
    fontSize: '2rem',
    color: '#333',
    marginTop: '20px',
  },
  subHeading: {
    fontSize: '1.5rem',
    color: '#333',
    marginTop: '15px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '1rem',
    color: '#777',
  },
};

export default Blog;
