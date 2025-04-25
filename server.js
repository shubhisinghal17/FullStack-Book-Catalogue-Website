"use strict";
import { searchBook, addBookToList, checkUserListDetails } from './book-controller.js';
import { checkSession, makeSession, deleteSession, registerUser } from './auth-controller.js';
import { createNewUserList, removeBookFromList, updateLatestSelectedList, getLatestSelectedList, getAllUsersDetails } from './list-controller.js';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;


app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/v1/session', checkSession);
app.post('/api/v1/session', makeSession);
app.delete('/api/v1/session', deleteSession);

app.post('/api/v1/register', registerUser);
app.post('/api/v1/books', searchBook);
app.post('/api/v1/add-to-list', addBookToList);
app.get('/api/v1/user-list-details', checkUserListDetails);
app.post('/api/v1/create-new-list', createNewUserList);
app.post('/api/v1/selected-list', updateLatestSelectedList);
app.get('/api/v1/selected-list', getLatestSelectedList);
app.delete('/api/v1/remove-book', removeBookFromList);
app.get('/api/v1/all-users-content', getAllUsersDetails);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));