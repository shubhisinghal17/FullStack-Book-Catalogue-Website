"use strict";
export function fetchBookDetails(bookName) {
    return fetch(`https://openlibrary.org/search.json?q=${bookName}`)
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};