"use strict";
import { getSessionUsername, addSession, deleteSessionFromModel, otherSessionsRemain } from './model-sessions.js';
import { isValid, isAllowed, addUser, deleteUser, isRegistered, isAdmin } from './model-users.js';

export function checkSession(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUsername(sid) : "";

    if (!sid || !isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json({ username });
};

export function makeSession(req, res) {
    const { username } = req.body;

    if (!isValid(username)) {
        res.status(400).json({ error: 'invalid-username' });
        return;
    }

    if (!isAllowed(username)) {
        res.status(403).json({ error: 'banned-user' });
        return;
    }

    if (!isRegistered(username)) {
        res.status(401).json({ error: 'unregistered-user' })
        return;
    }
    const sid = addSession(username);

    res.cookie('sid', sid);
    res.json({ username })
};

export function deleteSession(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUsername(sid) : "";

    if (sid) {
        deleteSessionFromModel(sid);
        res.clearCookie('sid');
    }

    res.json({ username });
};

export function registerUser(req, res) {
    const { username } = req.body;

    if (!isValid(username)) {
        res.status(400).json({ error: 'invalid-username' });
        return;
    }
    if (isAdmin(username)) {
        res.status(400).json({ error: 'admin-registeration-not-allowed' });
        return;
    }

    if (!isAllowed(username)) {
        res.status(403).json({ error: 'registered-user-exists' });
        return;
    }
    if (isRegistered(username)) {
        res.status(401).json({ error: 'registered-user-exists' })
        return;
    }

    addUser(username);
    res.json({ username })
}
