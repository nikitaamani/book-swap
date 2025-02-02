import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate for routing
import Swal from 'sweetalert2'; // Import SweetAlert2
import './UserDashboard.css';

const UserDashboard = ({ user, books, swapHistory, messages, onEditProfile, onAddBook, onRemoveBook, onEditBook }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({ name: '', email: '' });
  const [profileImage, setProfileImage] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUpdatedInfo({ name: user.name, email: user.email });
      setProfileImage(user.avatar || '');
    }
  }, [user]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddBook = () => {
    Swal.fire({
      title: 'What do you want to do with the book?',
      text: 'Choose an option to proceed.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Buy',
      cancelButtonText: 'Cancel',
      showDenyButton: true,
      denyButtonText: 'Rent',
      footer: '<a href="#">Swap is also available!</a>'
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to the Buy page
        navigate('/buybooks');
      } else if (result.isDenied) {
        // Navigate to the Rent page
        navigate('/rentbooks');
      } else if (result.isDismissed) {
        // Navigate to the Swap page
        navigate('/swapbooks');
      }
    });
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    setIsEditing(false); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>User Dashboard</h2>
      </div>

      <div className="dashboard-navigation">
        <button onClick={() => handleTabChange('profile')} className={activeTab === 'profile' ? 'active' : ''}>
          Profile
        </button>
        <button onClick={() => handleTabChange('my-books')} className={activeTab === 'my-books' ? 'active' : ''}>
          My Books
        </button>
        <button onClick={() => handleTabChange('swap-history')} className={activeTab === 'swap-history' ? 'active' : ''}>
          Swap History
        </button>
        <button onClick={() => handleTabChange('messages')} className={activeTab === 'messages' ? 'active' : ''}>
          Messages
        </button>
      </div>

      <div className="dashboard-content">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h3>Profile</h3>
            <div className="profile-info">
              <img
                src={profileImage}
                alt="User Avatar"
                className="profile-avatar"
              />
              {isEditing ? (
                <form onSubmit={handleSubmitProfile} className="edit-profile-form">
                  <label>Name: 
                    <input
                      type="text"
                      name="name"
                      value={updatedInfo.name}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>Email: 
                    <input
                      type="email"
                      name="email"
                      value={updatedInfo.email}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>Upload Avatar: 
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <button type="submit">Save Changes</button>
                </form>
              ) : (
                <div className="profile-details">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <button onClick={handleEditClick}>Edit Profile</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Books Tab */}
        {activeTab === 'my-books' && (
          <div className="my-books-section">
            <h3>My Books</h3>
            <ul>
              {books.map((book, index) => (
                <li key={index} className="book-item">
                  <div>
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                    <p>Status: <span className={book.status.toLowerCase()}>{book.status}</span></p>
                  </div>
                  <div className="book-actions">
                    <button onClick={() => onEditBook(book.id)}>Edit</button>
                    <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleAddBook}>Add New Book</button>
          </div>
        )}

        {/* Swap History Tab */}
        {activeTab === 'swap-history' && (
          <div className="swap-history-section">
            <h3>Swap History</h3>
            <ul>
              {swapHistory.map((swap, index) => (
                <li key={index} className="swap-history-item">
                  <p>{swap.book} was {swap.action} on {swap.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="messages-section">
            <h3>Messages</h3>
            {messages.length === 0 ? (
              <p>No new messages.</p>
            ) : (
              <ul>
                {messages.map((message, index) => (
                  <li key={index} className="message-item">
                    <p>{message.content}</p>
                    <small>{message.date}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
