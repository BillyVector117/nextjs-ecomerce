1. Create Layout component to wrap application an d making the structure of main page
2. Install and adding Material UI
3. Update components with material UI classes
4. Modify _app.jsx & _document.jsx to avoid refreshing styles for Material UI
5. Create dummy data at utils folder
6. Render at index.jsx all products as a Image component (using map) and binding props
7. Making card structure for each product/item
8. Modify NextJS Header Tag for each page in our site (SEO performance)
9. Make page structure for each product using Grid styles (MaterialUI-Flexbox)
10. Create a 'ThemeProvider' context that wraps all the application up (All inside Layout tag) Modifying primary, secondary colors and the typography styles
11. CREATE A CONTEXT
    1. Create Store.js file inside context folder
    2. Use createContext() for define a new context
    3. Define initial state, reducer function (which contains all cases) and the context Provider which is a React components that allows to wrap all components inside this one.
12. Use useContext() Hook in Layout component to access at Context and read its values (Changing Dark/Light mode) 
13. MongoDB connection
    1. Create database.js file to mongoDB connection
    2. Call into api/folderName to checkl if mongoDB connection works 
14. Create Product Model
15. Use Product Model to make querys in api calls
16. seed database with dummy data (Creating an endpoint and adding many documents) 
17. Fetch products from API
    1. Using getServerSideProps() to fetch data from database for main page and single product page
    2. Converting document type to vanilla Object JavaScript to get correctly data.
18. ADD TO CART FUNCTIONALITY
  1. Create a cart context 
  2. use useDispatch() hook for updating the cart context
  3. Set and get carItems from Cookies with cookies-js in Dipatch action
  4. Set click event handler for button cart so it will use cart action
  5. Create an endpoint ('/product/:id') for fetching one single product and validate is that item is in stock or not (Validation in click event)
19. CREATING CART SCREEN
 1. Create Cart Page
 2. Redirect to Cart Page using useRouter (next) when click on addToCart an item
 3. Create structure of Cart Page (Grid and tables from MaterialUI)
 4. Access to Cart Items from Context-API to set a row for each item in cart and show the item information
 5. Make a Card component that shows the Subtotal (Items quantity and total price)
 20. CONVERT CART PAGE TO DYNAMIC CART PAGE (AVOID BREAK STYLES WHEN REFRESHING PAGE)
  1. Fixing App-Bar and Car page components using next/dynamic for rendering that components only in client side and prevent bugs.
21. Update Cart items in Cart page (Select tag), Using dispatch action to Add the item depending on the selection value for Select tag.
22. Implement onClick handler for Deleting an item from cart-Items
23. Define logic for CART_REMOVE_ITEM in the reducer function in Store.js and use it in 'Delete' button.
24. Implement functionality for 'Add to cart' button in index page (In all carts) using the same 'CART_ADD_TO_CART' case
25. Modify and fix the product quantity for that dispatch, otherwise each added to cart will resets to 1 selected product
26. Modify Add To cart dispatch for Single product page ([id].jsx) with the same function like Index page (For fixing quantity bug)
27. Adding better logic for add to cart dispatch (User will not exced for out of stock products)
28. CREATING LOGIN PAGE
 1. Create checkoutHandler for Button to redirect /shopping or /login when click it
 2. Create Form component (Login section)
 3. Create shipping layout page
29. CREATING SAMPLE USERS
 1. Create User model
 2. Create sample data (User objects into data.js) to seed into database (Using api/seed.js) encrypting password with BcryptJS
30. BUILD LOGIN API
 1. Install JWT to generate token
 2. Create new POST api-endpoint (api/users/login.js) to authenticate users login (Returns the user found in database with Token (JWT) as aditional property)
 3. Implement logic for that endpoint checking for email & password, then creating a token using 'auth.js' helper from 'utils/auth.js' to send as response
 4. Implement submitHandler function on clicking login-button form which makes an api-request to the previous endpoint created ('/api/users/login') sending email and password as parameters to receive the user with a valid TOKEN.
31. COMPLETE LOGIN PAGE (HANDLING SUBMISSIONS)
 1. Set Menu-Selection tag (MaterialUI) for login button at App Bar
 2. When user log in  redirect him to '/', but if user check out without any account then redirect at /login (with /shipping redirect using router.query) so after enter with his cretendials redirect him to /shipping
 3. When exist an User then redirect him to '/' if enter to /login and change login button from App-Bar to Username
 4. Make functionality to log Out selection at Menu-selection in App-Bar (Creating a Reducer-case and Removing Cookies and global state)
32. CREATING REGISTER PAGE
 1. Create a register page (component)
 2. Create a new endpoint in api/register to allows to generate a new user
 3. Implement the same functionality like /login form using Context-API and saving in Cookies the new registered User.
33. LOGIN AND REGISTER FORM VALIDATIONS
 1. In base to TextFields tag from MaterialUI check for validations, so if exist show messages below the field.
 2. Install notistack for Pop-up messages, wrap all application in _app.js with SnackbarProvider, then use ir in Login page
 3. Change Inputs from login page to Controllers (React-hook-form) to implement validations.
34. CREATE SHIPPING PAGE
 1. 
 2.
 3.
 4. 
