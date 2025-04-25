import { useState } from 'react';
import './BooksResults.css';
function BooksResults({ setViewLists, setIsLoading, username, similarBooks, addSpecificBookToList, userListData }) {
    const [selectedList, setSelectedList] = useState('Read');
    function handleAddToList(e, book) {
        e.preventDefault();
        addSpecificBookToList(username, book, selectedList)
    };

    return (
        <div className="books-container">
            {Object.entries(similarBooks).map(([bookId, book]) => (
                <div key={bookId} className="book-card">
                    <div className="book-cover-container">
                        <img
                            src={book.cover}
                            alt={`Cover of ${book.title}`}
                            className="book-cover"
                        />
                    </div>

                    <div className="book-info">
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-author">by {book.author}</p>
                        <p className="book-year">Published: {book.year}</p>
                        <div className="book-actions">
                            <select
                                value={selectedList}
                                onChange={(e) => setSelectedList(e.target.value)}
                            >
                                {userListData && Object.keys(userListData).map(listName => (
                                    <option
                                        key={listName}
                                        value={listName}
                                    >
                                        {listName}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={(e) => handleAddToList(e, book)}
                                className="add-to-list"
                            >
                                Add to List
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BooksResults;