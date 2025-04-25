import './AdminPage.css';
import { LOGIN_STATUS, SERVER, MESSAGES } from './constants';

function AdminPage({ setAdminLoggedIn, onLogout, setLoginStatus, wholeData }) {
    function onClick(e) {
        e.preventDefault();
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        onLogout();
        setAdminLoggedIn(false);
    }

    const nonAdminUsers = Object.entries(wholeData).filter(([username]) => username !== 'admin');
    const hasUsers = nonAdminUsers.length > 0;

    return (
        <div className="admin-container">
            <button className='admin-logout-button' type="submit" onClick={onClick}>Logout</button>

            {hasUsers ? Object.entries(wholeData).filter(([username]) => username !== 'admin').map(([username, userData]) => (
                <div key={username} className="user-row">
                    <div className="username-column">
                        <h2 className="user-name">{username}</h2>
                    </div>

                    <div className="lists-column">
                        {Object.entries(userData.lists).map(([listName, books]) => (
                            <div key={listName} className="list-container">
                                <h3 className="list-name">{listName}</h3>
                                <div className="books-details">

                                    {Object.entries(books).map(([bookID, bookDetails]) => (
                                        <div key={bookID} className="book-card">
                                            <img
                                                src={bookDetails.cover}
                                                alt={bookDetails.title}
                                                className="book-cover"
                                            />
                                            <div className="book-details">
                                                <p className="book-title">{bookDetails.title}</p>
                                                <p className="book-author">{bookDetails.author}</p>
                                                <p className="book-year">{bookDetails.year}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )) :
                <div className='empty-admin-container'><p>No Users Yet</p></div>}
        </div>
    );
}

export default AdminPage;