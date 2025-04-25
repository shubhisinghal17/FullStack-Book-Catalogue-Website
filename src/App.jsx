import { useState, useEffect } from 'react';
import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  MESSAGES,
} from './constants';

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchBooks,
  fetchAddBookToAList,
  fetchUserListsAndBooks,
  fetchCreatedList,
  fetchRemoveBookFromList,
  fetchGetNameOfLatestList,
  fetchUpdateLatestSelectedList,
  fetchAllUsersContent,
} from './services';
import Loading from './Loading';
import LoginForm from './LoginForm';
import Status from './Status';
import RegisterationForm from './RegisterationForm';
import Header from './Header';
import BooksResults from './BooksResults';
import UserLists from './UserLists';
import AdminPage from './AdminPage';

function App() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [oldUserWord, setOldUserWord] = useState('');
  const [isRegistered, setIsregistered] = useState(false);
  const [showBookResults, setShowBookResults] = useState(false);
  const [similarBooks, setSimilarBooks] = useState({});
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [viewLists, setViewLists] = useState(true);
  const [userListData, setUserListData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tempList, setTempList] = useState("Read");
  const [lastSelectedList, setLastSelectedList] = useState("Read");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [wholeData, setWholeData] = useState({});

  function onLogin(username) {
    if (username === 'admin') {
      fetchLogin(username)
        .then(username => {
          setError('');
          setIsregistered(false);
          setUsername(username.username);
          setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
          setAdminLoggedIn(true);
          return fetchAllUsersContent();
        })
        .then(response => {
          setWholeData(response.allUsersContent);
        })
        .catch(err => {
          setError(err?.error || 'ERROR');
        })
    }

    else {
      fetchLogin(username)
        .then(username => {
          setError('');
          setIsregistered(false);
          setUsername(username.username);
          setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
          return fetchUserListsAndBooks(username);
        })
        .then(data => {
          setUserListData(data.userAndHisListDetails.lists);
        })
        .catch(err => {
          setError(err?.error || 'ERROR');
        })
    }
  };


  function latestSelectedList(lastSelectedList) {
    fetchUpdateLatestSelectedList(lastSelectedList)
      .then(() => {
        return fetchUserListsAndBooks(username);
      })
      .then(data => {
        setUserListData(data.userAndHisListDetails.lists);
        setLastSelectedList(lastSelectedList);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
      })
  };

  function checkForSession() {
    fetchSession()
      .then(session => {
        const currentUsername = session.username;
        setUsername(currentUsername);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setIsLoading(false);
        setError('');
        if (currentUsername !== 'admin') {
          fetchUserListsAndBooks(session.username)
            .then(data => {
              setViewLists(true);
              setUserListData(data.userAndHisListDetails.lists);
              const initialList = data.userAndHisListDetails.latestList || "Read";
              setLastSelectedList(initialList);
              setTempList(initialList);
            })
            .catch(err => {
              setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
              setIsLoading(false);
              if (err?.error !== SERVER.AUTH_MISSING) {
                const errorMessage = MESSAGES[err?.error] || MESSAGES.default;
                setError(errorMessage);
              }
            });
        }

        else {
          setError('');
          setIsregistered(false);
          setUsername(username.username);
          setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
          setAdminLoggedIn(true);
          fetchAllUsersContent()
            .then(response => {
              setWholeData(response.allUsersContent);
            })
            .catch(err => {
              setError(err?.error || 'ERROR');
            })
        }
      })

      .catch(err => {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setIsLoading(false);
        if (err?.error !== SERVER.AUTH_MISSING) {
          const errorMessage = MESSAGES[err?.error] || MESSAGES.default;
          setError(errorMessage);
        }
      });
  };


  function onRegister(username) {
    fetchRegister(username)
      .then(username => {
        setError('');
        setIsregistered(true);
      })
      .catch(err => {
        setIsregistered(false);
        setError(err?.error || 'ERROR');
      })

  };
  function onSearchBook(bookName) {
    setIsLoading(true);
    fetchBooks(bookName)
      .then(data => {
        setSimilarBooks(data.books || {});
        setError('');
        setDisplaySearchResults(true);
        setIsLoading(false);
        return fetchUserListsAndBooks(username);
      })
      .then(data => {
        setUserListData(data.userAndHisListDetails.lists);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err?.error || 'ERROR');
        setSimilarBooks({});
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
      })
  }

  function addSpecificBookToList(username, book, selectedList) {
    setIsLoading(true);
    fetchAddBookToAList(username, book, selectedList)
      .then(() => {
        return fetchUserListsAndBooks(username);
      })
      .then(data => {
        setUserListData(data.userAndHisListDetails.lists);
        setError('');
        setUserListData(data.userAndHisListDetails.lists);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
      })
  };

  function viewUserDetails(username) {
    fetchUserListsAndBooks(username)
      .then(data => {
        setError('');
        setUserListData(data.userAndHisListDetails.lists);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
      })
  }

  function createNewList(username, userSubmittedListName) {
    fetchCreatedList(userSubmittedListName)
      .then(data => {
        setError('');
        return fetchUserListsAndBooks(username);
      })
      .then(data => {
        setUserListData(data.userAndHisListDetails.lists);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
      })
  };

  function removeBookFromList(username, bookID, listName) {
    fetchRemoveBookFromList(username, bookID, listName)
      .then(data => {
        return fetchUserListsAndBooks(username);
      })
      .then(data => {
        setUserListData(data);
        setError('');
        setUserListData(data.userAndHisListDetails.lists);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
      })
  };

  function onLogout() {
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setDisplaySearchResults(false);
    fetchLogout()
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  };

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  return (
    <>
      {loginStatus === LOGIN_STATUS.PENDING ? <Loading setLoginStatus={setLoginStatus} /> : <></>}
      {error && <Status error={error} />}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN &&
        <div className='access-container'>
          <LoginForm onLogin={onLogin} setError={setError} isRegistered={isRegistered} />
          <RegisterationForm onRegister={onRegister} setIsregistered={setIsregistered} setError={setError} />
        </div>}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && !adminLoggedIn && < Header onLogout={onLogout} setLoginStatus={setLoginStatus} viewUserDetails={viewUserDetails} setDisplaySearchResults={setDisplaySearchResults} setViewLists={setViewLists} username={username} onSearchBook={onSearchBook} />}
      {displaySearchResults && loginStatus === LOGIN_STATUS.IS_LOGGED_IN && !adminLoggedIn && <BooksResults setViewLists={setViewLists} setIsLoading={setIsLoading} username={username} similarBooks={similarBooks} addSpecificBookToList={addSpecificBookToList} userListData={userListData} />}
      {viewLists && loginStatus === LOGIN_STATUS.IS_LOGGED_IN && !adminLoggedIn && <UserLists lastSelectedList={lastSelectedList} setLastSelectedList={setLastSelectedList} latestSelectedList={latestSelectedList} tempList={tempList} setTempList={setTempList} removeBookFromList={removeBookFromList} createNewList={createNewList} username={username} userListData={userListData} />}
      {isLoading && <Loading />}
      {adminLoggedIn && <AdminPage setAdminLoggedIn={setAdminLoggedIn} onLogout={onLogout} setLoginStatus={setLoginStatus} wholeData={wholeData} />}
    </>
  )
}
export default App;
