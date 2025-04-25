export function fetchSession() {
    return fetch('/api/v1/session', {
        method: 'GET'
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchAllUsersContent() {
    return fetch('/api/v1/all-users-content', {
        method: 'GET'
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchLogin(username) {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchUpdateLatestSelectedList(tempList) {
    return fetch('/api/v1/selected-list', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ tempList }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {

            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchGetNameOfLatestList(username) {
    return fetch('/api/v1/selected-list', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {

            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchLogout() {
    return fetch('/api/v1/session', {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};

export function fetchUserData(username) {
    return fetch('/api/v1/user-list-details', {
        method: 'GET'
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchRegister(username) {
    return fetch('/api/v1/register', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchBooks(bookName) {
    return fetch('/api/v1/books', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ bookName }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchAddBookToAList(username, book, selectedList) {
    return fetch('/api/v1/add-to-list', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username, book, selectedList }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchUserListsAndBooks(username) {
    return fetch('/api/v1/user-list-details', {
        method: 'GET'
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchCreatedList(userSubmittedListName) {
    return fetch('/api/v1/create-new-list', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ userSubmittedListName }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return response.json().then((err) => Promise.reject(err))
        })
};

export function fetchRemoveBookFromList(username, bookID, listName) {
    return fetch('/api/v1/remove-book', {
        method: 'DELETE',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username, bookID, listName }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};