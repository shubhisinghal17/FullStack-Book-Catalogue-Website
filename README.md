1. Run "npm install"
2. Start the backend with "npm run start"
3. In a seperate terminal run "npm run dev"
4. Open your frontend in browser at "http://localhost:5173"



This Project takes inspiration from the book cataloging website GoodReads and I am calling it BookCatalogueWebsite .
The project allows people to Login to the BookCatalogueWebsite. The users can then search for any book they like and they also have option to add book to various lists like the TBR or Read. Apart from searching for books, the user can also view their respective Lists. As mentioned before, the default lists are called TBR and Read, BUT the user can also create their own custom lists to add books to them. Once the user has added a book to the list, they can also delete the book from that list whenever they wish.
Every user can only see their own personally saved books and lists data (which also includes custom lists) and can’t access any other user’s personal data. I have also included a user called “Admin” who can see the data for all the registered users but cannot modify their users data.

• “dog” has been a banned username and has been treated differently from invalid characters in the username: Meaning that not only will a user not be able to register as “dog” but when a user tries to login as “dog” they will be told that they don’t have permission to access the website. Meaning that they are banned. This is being validated in frontend and backend

• Username with special characters are not allowed to register.

• “admin” is already a registered username so user can’t register using “admin”. This has been validated in frontend and backend.

• User can login using “admin” to see the list details of all the registered users. But all the individual users can only access their individual data and can not see any other user’s list data. Only “admin” has that access.

• If no user has been logged in yet, then the admin will see an empty page with a logout button.

• I have used Open Library as an external API to search for the books on being entered by users. ( https://openlibrary.org/dev/docs/api/search )

o So when a user tries to search for a book on my website, my API sends a request to Open Library’s API to get various results, which I have limited to 10 results in-order to save on loading time

o Once the response from OpenLibrary is parsed and formatted, it is sent to my API service calls to be shown to the user.

• When the user clicks on ‘My Lists’ in the header, they can see all their lists and can further click on any list and can see the books saved in that particular list. They also see an option to create new lists under all the lists mentioned. Once they create a new list and then try to search for a book, they will be able to add that book to their created list as well.

• While user is on the lists page and refreshed the page, they can still see the details of the previous list they were seeing. But when the user is searching for books and refreshed the page, they go back to seeing the Lists page again.

• If a user is logged in multiple different browsers and they log out of one browser, they do not get logged out in other browsers. But if the user is logged in multiple tabs in the same browser and logs out of one tab, they can’t make changes to their page in other tabs until they login again.  

• In between requests, the user can see “Loading” page

STEPS TO FOLLOW TO UNDERSTAND THE NITIGRITIES OF THE WEBSITE IF NEEDED

1. Type “dog” in register form and you won’t be allowed to take it and will see an error message. Type “dog” in Login form and you will realize that “dog” is a banned user, who is not allowed to login
2. Type special characters and Register form and you wont be allowed to register
3. Type “admin” in Register form and you won’t be allowed to register and a user already exists.
4. Type “admin” in Login from and you will see a new window saying “No Users Yet” (because no user has registered yet) and a Logout button.
5. Logout of the Admin Page and register a user, for eg: Stephan
6. Now login as “admin” and you will see “Stephan” with his lists(which are empty for now since Stephan didn’t add any books to his lists)
7. Logout of Admin Page and login as Stephan and and you will see that all your lists are empty for now.
   o Click on “Create New List” button and enter any custom name for you list for ex: “Dummy_list
   o As soon as you hit enter or click submit, you will see the “Dummy_List” being shown as part of the List.
8. Now search a book ex: “Twilight” in the header and click enter.
   o Now you will see the details of various books and have dropdown to add books to the various lists.
   o Note that you are also seeing and option to add book to the custom list “Dummy_List” that you created
   o Add any book to any list and then click on “My Lists” in the header.
   o Now a the lists page will open and when you click on the list to which you entered your books, you will see all the books you added to that particular list.
   o If you want to remove any book from any list, click the “Delete Book from This List” and the book will be deleted from that list both in the frontend and backend
   o If you refresh the page, you will land again on the page for the list you were seeing, unless you changed the value of the cookie in the headers, in which case you will be redirected to the login page
   o On another browser login as “Admin” and you will see the updated lists for all the users.
    To check whether the Admin is taking live updates or not, try making changes to Stephan’s lists and then refresh Admin’s page and you will see that the lists have been updated accordingly.
9. Additionally try writing something jibberish in the book search bar and you will see an appropriate error message saying that the book hasn't been found
   Sources and External Resources Used:
   https://openlibrary.org
