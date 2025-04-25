import { useState } from 'react';
import { LOGIN_STATUS, SERVER, MESSAGES } from './constants';
import './Header.css';
function Header({ onLogout, setLoginStatus, viewUserDetails, setDisplaySearchResults, setViewLists, username, onSearchBook }) {
    const [typedInput, setTypedInput] = useState("");
    const handleInput = (e) => {
        setTypedInput(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        if (typedInput) {
            const bookName = typedInput;
            onSearchBook(bookName);
            setTypedInput("");
            setViewLists(false);
        }
    };

    function openLists() {
        setViewLists(true);
        setDisplaySearchResults(false);
        viewUserDetails(username);
    };

    function onClick(e) {
        e.preventDefault();
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        onLogout();
    }


    return (
        <>
            <div className="header" >
                <div className='welcome-heading'>
                    <h1>Hi {username}</h1>
                </div>
                <div onSubmit={onSubmit}>
                    <form className="search-form" action="#search">
                        <label htmlFor="book-search">
                            Book Name
                        </label>
                        <input id="book-search" className="book-search" value={typedInput} placeholder='Enter Book Name' onChange={handleInput} />
                    </form>
                </div>

                <div>
                    <button className="lists-button" type="submit" onClick={openLists}>My Lists</button>
                </div>
                <div className='logout-section'>
                    <button className="logout-button" type="submit" onClick={onClick}>Logout</button>
                </div>
            </div>
        </>
    )


};
export default Header;