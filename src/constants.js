export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  BANNED_USER: 'banned-user',
  INVALID_USERNAME: 'invalid-username',
  INPUT_MISSING: "input-missing",
  UNREGISTERED_USER: "unregistered-user",
  REGISTERED_USER_EXISTS: 'registered-user-exists',
  NO_BOOKS_FOUND: 'no-books-found',
  API_ERROR: 'api-error',
  BOOK_MISSiNG: 'book-missing',
  ADMIN_REGISTERATION_NOT_ALLOWED: 'admin-registeration-not-allowed'
};

export const CLIENT = {
  NETWORK_ERROR: 'network-error',
  NO_SESSION: 'noSession',
};

export const MESSAGES = {
  [CLIENT.AUTH_MISSING]: 'Something wehnt wrong. Please try logging in again',
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  [SERVER.BANNED_USER]: '"dog" is already a registered user not having enough permissions to login',
  [SERVER.INVALID_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
  [SERVER.REQUIRED_TASK]: 'Please enter the task to do',
  [SERVER.INPUT_MISSING]: 'Please input some word as an input before submitting',
  [SERVER.UNREGISTERED_USER]: 'Please Register First to login',
  [SERVER.REGISTERED_USER_EXISTS]: 'Please choose a different username as this username already exists',
  [SERVER.NO_BOOKS_FOUND]: 'Sorry! But we can not find a book with the same name',
  [SERVER.BOOK_MISSiNG]: 'Please enter a book to search',
  [SERVER.API_ERROR]: 'Error searching from Server data. Please try again after some time',
  [SERVER.ADMIN_REGISTERATION_NOT_ALLOWED]: "You don't have permission to register as Admin.",
  default: 'Something went wrong.  Please try again',
};

