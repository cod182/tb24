# Dev Challenge





## Caveats
- I used Appwrite for my database and authentication. Unfortunately, it doesn’t natively support logging in with a username, only with an email. To work around this, I implemented a solution where the username is submitted in place of the email field when logging in. The user’s actual email address is then saved in the realEmail field within the user collection.