"use strict";
import { checkSession, makeSession, deleteSession, registerUser } from './auth-controller.js';
import { getSessionUsername, addSession, deleteSessionFromModel, otherSessionsRemain } from './model-sessions.js';
import { fetchBookDetails } from "./services.js";
import { getNameOfLastSelectedList, isValid, addList, isAllowed, addUser, deleteUser, isRegistered, addBookToExpectedList, getUserSpecificDetails, deleteBookFromUserList, inputTheLatestSelectedList, getAllUsersInformation } from './model-users.js';

export function createNewUserList(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUsername(sid) : "";
    const { userSubmittedListName } = req.body;

    if (!username || !isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const userData = addList(username, userSubmittedListName)

    res.json({ userData });
};

export function removeBookFromList(req, res) {
    const sid = req.cookies.sid;
    const name = sid ? getSessionUsername(sid) : "";

    if (!name || !isValid(name)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { username, bookID, listName } = req.body;
    const updatedUserLists = deleteBookFromUserList(username, bookID, listName)

    res.json({ updatedUserLists });
};

export function updateLatestSelectedList(req, res) {
    const sid = req.cookies.sid;
    const name = sid ? getSessionUsername(sid) : "";

    if (!name || !isValid(name)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { tempList } = req.body;
    const latestList = inputTheLatestSelectedList(name, tempList)

    res.json({ latestList });
}

export function getLatestSelectedList(req, res) {
    const sid = req.cookies.sid;
    const name = sid ? getSessionUsername(sid) : "";
    if (!name || !isValid(name)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { username } = req.body;
    const latestList = getNameOfLastSelectedList(username)

    res.json({ latestList });
};

export function getAllUsersDetails(req, res) {
    const sid = req.cookies.sid;
    const allUsersContent = getAllUsersInformation();

    res.json({ allUsersContent });
}