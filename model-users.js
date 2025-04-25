"use strict";
const users = { admin: { lists: { Read: {}, TBR: {} }, latestList: 'Read' } };

export function isValid(username) {
    let validity = true;
    validity = !!username && username.trim();
    validity = validity && username.match(/^[A-Za-z0-9_]+$/);
    return validity;
};

export function isAllowed(username) {
    return username === 'dog' ? false : true;
};

export function isAdmin(username) {
    return username === 'admin' ? true : false;
}

export function addUser(username) {
    users[username] = {
        lists: {
            Read: {},
            TBR: {},
        },
        latestList: 'Read'
    };
};
export function addBookToExpectedList(username, book, selectedList) {
    users[username].lists[selectedList][book.id] = book;
    return users[username].lists;
};

export function deleteUser(username) {
    delete users[username];
};

export function isRegistered(username) {
    if (users[username]) {
        return true
    }
    return false;
};

export function getUserSpecificDetails(username) {
    return users[username];
};

export function addList(username, userSubmittedListName) {
    users[username].lists[userSubmittedListName] = {}
    return users[username].lists;
};

export function deleteBookFromUserList(username, bookID, listName) {
    delete users[username].lists[listName][bookID];
    return users[username].lists;
};

export function inputTheLatestSelectedList(name, tempList) {
    users[name].latestList = tempList;
    return users[name].latestList;
};

export function getNameOfLastSelectedList(username) {
    return users[username].latestList;
}

export function getAllUsersInformation() {
    return users;
};
