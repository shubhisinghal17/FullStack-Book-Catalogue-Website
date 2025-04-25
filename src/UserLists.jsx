import { useState } from 'react';
import './UserLists.css';
function UserLists({ lastSelectedList, setLastSelectedList, latestSelectedList, tempList, setTempList, removeBookFromList, createNewList, username, userListData }) {
    // const [tempList, setTempList] = useState("Read")
    const [userCreatingNewList, setUserCreatingNewList] = useState(false);
    const [nameOfNewList, setNameOfNewList] = useState("");
    const [finalNewList, setFinalNewList] = useState("");
    const [tryingToSubmitEmpyName, setTryingToSubmitEmpyName] = useState(false);
    const [selectedBook, setSelectedBook] = useState({});

    function onListSelect(listName) {
        setTempList(listName);
        setUserCreatingNewList(false);
        latestSelectedList(listName);
        setLastSelectedList(listName);
    };

    function userWantsToCreateNewList() {
        setUserCreatingNewList(true);
        setNameOfNewList("");
    };

    function handleChangingName(e) {
        setNameOfNewList(e.target.value);
        setTryingToSubmitEmpyName(false);
    };

    function onSubmit(e) {
        e.preventDefault();
        if (nameOfNewList) {
            const userSubmittedListName = nameOfNewList;
            setFinalNewList(userSubmittedListName);
            createNewList(username, userSubmittedListName);
            setTryingToSubmitEmpyName(false);
            setNameOfNewList("");
            setUserCreatingNewList(false);
        }
        else {
            setTryingToSubmitEmpyName(true);
        }
    };

    function handleDeletedBook(e, bookID) {
        removeBookFromList(username, bookID, tempList)
    };

    return (
        <>
            <div className='user-lists-and-books'>
                <div className="lists-container">
                    {Object.keys(userListData).map(listName => (
                        <button
                            key={listName}
                            className={`list-button ${lastSelectedList === listName ? 'selected-list' : ''} `}
                            onClick={() => onListSelect(listName)}
                        >
                            {listName}
                        </button>
                    ))}
                    <button className='create-list-button' onClick={() => userWantsToCreateNewList()}> Create New List</button>
                    {tryingToSubmitEmpyName && <p>Please enter a list name to create a list</p>}
                    {userCreatingNewList &&
                        <div className="new=list" onSubmit={onSubmit}>
                            <form className="new-list-form" action="#new-list">
                                <input id="new-list-input" className="new-list-input" placeholder="Enter your Custom list Name" value={nameOfNewList} onChange={(e) => handleChangingName(e)} />
                                <button className="new-list-button" type="submit">Submit List Name</button>
                            </form>
                        </div>
                    }
                </div>
                <div className="books-container-in-list">
                    {userListData[tempList] && Object.keys(userListData[tempList]).length > 0 ? Object.values(userListData[tempList]).map(book => (
                        <div key={book.id} className="book-card-in-list">
                            <div className="book-cover-container-in-list">
                                <img
                                    src={book.cover}
                                    alt={`Cover of ${book.title}`}
                                    className="book-cover-in-list"
                                />
                            </div>
                            <div className="book-info-in-list">
                                <h3 className="book-title-in-list">{book.title}</h3>
                                <p className="book-author-in-list">by {book.author}</p>
                                <p className="book-year-in-list">Published: {book.year}</p>
                            </div>
                            <form className="delete-book-in-list" action="#remove">
                                <button className="delete-book-button-in-list" type="submit" onClick={(e) => handleDeletedBook(e, book.id)}>Delete Book From the List</button>
                            </form>
                        </div>
                    )) :
                        <div className="empty-list-message">
                            <p>Empty list</p>
                        </div>}


                </div>
            </div>

        </>

    );
}

export default UserLists;