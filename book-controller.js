"use strict";
import { checkSession, makeSession, deleteSession, registerUser } from './auth-controller.js';
import { getSessionUsername, addSession, deleteSessionFromModel, otherSessionsRemain } from './model-sessions.js';
import { fetchBookDetails } from "./services.js";
import { isValid, isAllowed, addUser, deleteUser, isRegistered, addBookToExpectedList, getUserSpecificDetails } from './model-users.js';

export function searchBook(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUsername(sid) : "";
    const { bookName } = req.body;
    if (!username || !isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    if (!bookName) {
        res.status(400).json({ error: 'book-missing' });
        return;
    }

    fetchBookDetails(bookName)
        .then(data => {
            if (!data.docs || data.docs.length === 0) {
                res.status(404).json({ error: 'no-books-found' });
                return;
            }

            const books = {};
            data.docs.slice(0, 10).forEach(book => {
                if (book.key) {
                    books[book.key] = {
                        title: book.title,
                        author: book.author_name ? book.author_name.join(', ') : 'Unknown',
                        year: book.first_publish_year || 'Unknown',
                        cover: book.cover_i
                            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                            : null,
                        id: book.key,
                    };
                }
            });

            res.json({ books });
        })
        .catch(err => {
            res.status(500).json({ error: 'api-error' });
        });
};

export function addBookToList(req, res) {
    const sid = req.cookies.sid;
    const name = sid ? getSessionUsername(sid) : "";
    const { username, book, selectedList } = req.body;

    if (!name || !isValid(name)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const userBookListDetails = addBookToExpectedList(username, book, selectedList)
    res.json({ userBookListDetails })
};

export function checkUserListDetails(req, res) {
    const sid = req.cookies.sid;
    const name = sid ? getSessionUsername(sid) : "";
    const userAndHisListDetails = getUserSpecificDetails(name);
    res.json({ userAndHisListDetails });
};