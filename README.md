**How to install and run this application:**
1. Clone this github repo on your system using git clone.
2. Open terminal in the project directory and run "npm install"
3. This app needs firebase environment variables to run. Following are the variables needed:
VITE_FIREBASE_API_KEY=AIzaSyAM7g5ouHf3ADu74Pt4xTbTo6puOkWaBAk
VITE_FIREBSAE_AUTH_DOMAIN=sharpe-ai-b9915.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sharpe-ai-b9915
VITE_FIREBASE_STORAGE_BUCKET=sharpe-ai-b9915.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=377083472023
VITE_FIREBASE_APP_ID=1:377083472023:web:baf0f5d0afce9b95e521d2
VITE_FIREBASE_MEASUREMENT_ID=G-MJDBM08BMV
Make a new .env file in the root of your directory and paste the above mentioned variables in it.
4. In your terminal type: "npm run dev", your vite app will start running on localhost.

**Features of the Project:**
1. The application is fully mobile responsive and accesible.
2. The landing page gives clear presentation of the whole website with easily understandable navigation.
3. Application uses react toasts for success and failure alerts on form validation and copy to clipboard actions.
4. The Data Page has pagination feature which makes it easier for the user to access data rather than scrolling all the way down of the list.
5. Data Page uses memoization technique to efficiently store the data fetched from firestore database.
6. Data Page also uses the real time update feature provided by firebase, so when there is a change in the database the page is automatically reloaded and data automatically fetched and displayed.
7. A Skeleton as a loader for the table.
8. Toast and submit spamming is solved.
