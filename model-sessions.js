"use strict";
import { randomUUID as uuid } from 'crypto';
const sessions = {};

export function getSessionUsername(sid) {
    const username = sessions[sid] ? sessions[sid].username : undefined;
    return username;
};

export function addSession(username) {
    const sid = uuid();
    sessions[sid] = { username };
    return sid;
};

export function deleteSessionFromModel(sid) {
    if (sessions[sid]) {
        delete sessions[sid];
    }
};

export function otherSessionsRemain(username) {
    for (const sid in sessions) {
        if (sessions[sid].username === username) {
            return true;
        }
    }
    return false;
};

