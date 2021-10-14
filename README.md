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
 1. Duplicate login page to shipping page, then add more Inputs refering to User Address including validations with react-hook-form.
 2. Add a new property in the Context-API (Store.js) named as "shippingAddress" inside 'car' property.
 3. When User clicks on Continue (Shipping page) automatically Shipping Address will save at Cookies , and If refresh page all inputs values will restore from last visit (Loading Cookies)
 4. Also when User clicks on Continue Button Shipping-Address data will save at Context-API as "shippingAddress" using a new action.type from Reducer function (case)
 5. Set a Stepper (From MaterialUI) above Shipping Address Form to improve UI 
35. CREATING PAYMENT PAGE
 1. Use a class Style for Stepper (CheckOutWizard) defined at Styles.js to get transparent backgroundColor.  
 2. Create payment.jsx at pages
 3. Build the structure for payment page (Set Radio-Buttons inside a List element)
 4. By Clicking to Continue Button will save payment-Method to Context-API and Cookies to load that data when refreshing page
 5. Set a "Back" Button to return previous page 
36. CREATE PLACE ORDER PAGE
 1. Load automatically payment Method from Cookies, so set 'paymentMethod' property in Context-API and load data from Cookies (saved from /payment)
 2. Create a structure of place order page using Grid tags (MaterialUI)
 3. Read data from Context-API 
 4. Calculate 'itemsPrice', 'shippingPrice', 'taxPrice', 'totalPrice' from the Context-API properties (Using 'Reducer()' and rounding Int)
 5. Set three Card tags (MaterialUI) in the JSX Structure which contains Shipping Address, Payment Method and Order Items (All extracted from Context-API)
37. IMPLEMENT PLACE ORDER ACTION (BUTTON)
 1. Set a loader (MaterialUI) when click button
 2. Send a request to '/api/orders' (No created yet) with order properties ( orderItems,
paymentMethod, shippingAddress, shippingPrice, taxPrice, totalPrice, itemsPrice,)all this properties were calculated in this page and extracted from Context-API
 3. Also send in Headers request the USER TOKEN with 'Authorization' property (Saved in Context-API at 'userInfo')
 4. Create and use a Dispatch action (CART_CLEAR) for cleaning the cart and remove Cookies (Because at this time the order is complete ) 
 5.  The request to '/api/orders' returns an Order Object which contains all order properties and the TOKEN User, use this Order Object to send User another page (Sngle order details page) using the _id for that single Order (returned in request data). The redirected page is like: '/order/:_id' 
 6. Implement the '/api/orders' endpoint which returns an Order Object and USER TOKEN
 7. Use a Middleware for '/api/orders' (isAuth) to verify is the real User, (use the TOKEN sent when click Button, then verify token with 'jwt.verify()' if sucess set in 'req' Object a new property (req.user) and continue with the next process for API  (next())).
 8. '/api/orders' creates a new Order Object (Using Object data sent by user when click button and also using the user._id received in middleware Auth to create this new Order Object ). View Order Model to see how is the returned data.
38. CREATE ORDER DETAILS PAGE (After click Order Action Button) 
 1. Create endpoint `/api/orders/[id] ` which must verify through 'isAuth' Middleware if User token is valid.
 2. The request allows to return an Order Object (View Model) By setting the Order ID
 3. In order Details page extract the :id from Url-Params using 'getServerSideProps({ params })' and sending it to fronted as props (orderId)
 4. Create a reducer function and use useReducer Hook to manage the flow of data in that page
 5.  Reducer function contains 3 cases (FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL) which changes the loader, order (response from request) and error properties.
 6.  In useEffect Hook check if userInfo exists (from Context-API)
 7. If so, make a request to `/api/orders/${orderId}` (orderId is received from Url-Params) sending User Token at Headers section (Token is from userInfo.token (Context-API))
 8. Save response in useReducer state
 9. Now having User properties and Order response properties make a similar structure like "placeorder" page showing Order ID, shipping addres (status), payment method (status), order items and summary.
39.  PAYPAL PAYMENT METHOD
 1. After creating Paypal Developer account, Create a new App in Sandbox to get client_id and do the same steps for Live App (Real transactions)
 2. Install  @paypal/react-paypal-js
 3. Wrap application (_app.js) with PaypalScriptProvider tag to make use of PayPal methods inside this provider.
 4. Create useReducer Hook which contains 'loading, error, order' variables to load the order data inside this hook and use for eventual validations.
 5. Define usePayPalScriptReducer Hook to extract the 'loading' and dispatch PayPal Actions
 (const [{ isPending }, paypalDispatch] = usePayPalScriptReducer())
 6. Make a new GET endpoint at '/api/keys/paypal' which returns the clientID from .env.local  (needs user TOKEN)
 7. In useEffect Hook, validate if exist the order._id and successPay = true, at first time it will not exist and 'successPay' will be false, so make a GET request to `/api/orders/${orderId}` (orderId refers to Url-Params) and this endpoint will return the single order Object with all its properties including id, so SAVE ORDER OBJECT into useReducer 'order' variable.
 8. After this validation in useEffect, validate again 'successPay' at first time will be false, so make a request to load PayPal Script, this function will dispatch a PayPal action ('resetOptions') and it needs the clientID for the PayPal Account, in this case we will make a request GET to'/api/keys/paypal' to get this clientID (for security needs user TOKEN)
9. After that, call  a new PayPal dispatch ('setLoadingStatus') with value 'pending' to set a loader in UI
10. Show PayPal Button while isPaid (from order Object) is false, this button has three properties which are functions (createOrder, onApprove, onApprove)
11. When click the button it will invoque createOrder() this functions allows to create a new PayPal order and must to set the total Prive to pay in amount{ value: $$$}, this function returns a Promise which contains the order Generated by PayPal (like orderID from PayPal)
12. Create new cases for the payment which will end with: loadingPay: false, successPay: true
13. Once user has paid, automatically invoque onApprove() (we sent this function through PayPal button) and dispatch 'PAY_REQUEST' case which enables a loader.
14. OnAprrove() we need to update in database the single Order to 'isPaid' property TO TRUE,
so make a PUT (UPDATE) request to `/api/orders/${order._id}/pay` (remember order Object (order._id) we save making another request in useEffect).
15. onApprove() requires the details (generated by PayPal when pais is success) and the user TOKEN through headers.
16. Create this endpoint `/api/orders/${order._id}/pay` which firstable verify user TOKEN, second, find the order document by ID in database then change 'isPaid: true, paidAt: date.Now(), paymentResult { id: req.body.id, status:req.body.status, email_address: req.body.email_address } after UPDATE this fields, return the document
17. We will dispatch ('PAY_SUCCESS') and it changes 'successPay' variable to TRUE, so it will render useEffect() and will check is user has paid, if so, then disable PayPal Button and change some UI information like paidAt, isPaid and stats, so PayPal Button will dissapear (This button is comming from PayPal library as 'PayPalButtons' Tag)
39. MAKE ORDER HISTORY PAGE
1. Create order-history.jsx file in pages
2. Verify exist 'useInfo' (Context-API) inside useEffect
3. Make a reducer function with its own cases (to use useReducer Hook) it allows to manage easy the loader, orders (final object will be array type) and error states
4. define useReducer Hook with its variables { loading: true, orders: [], error: '' }
4. Create structure of the page which contains two Grids tags (MaterialUI) for separe left side and content side
5. Inside a Table tag (MaterialUI) loop all Orders (Array, response from request) using .map()
6. Make a GET endpoint `/api/orders/history` for capture all orders OF CURRENT USER
5. Execute fetchOrder() inside useEffect, which send a request API to `/api/orders/history` (User TOKEN needed) and its corresponding cases types to GET ALL ORDERS FOR CURRENT USER.
8. Set Links to ./order-history and /profile in App Bar-Select (within Username) 
40. IMPLEMENT PROFILE PAGE
 1. Create a new page "profile.jsx" at pages
 2. Make structure similar to "register.jsx" but password is not required
 3. Make a request to '/api/users/profile' sending data-form and user TOKEN
 4. Create a new file at '/api/users/profile as PUT endpoint
 5. Authenticate User with isAuth middleware, then get the ._id from req.user and update that document in database with all data-form fields (return the object with a new token)
41. SYS ADMIN PAGE
 1. Create a new select from Dropdown (App Bar) for redirect to '/admin' (Only display if 'isAdmin' property User is True)
 2. Create the Layout for Admin pages (Same App Bar but changing name, assing a Dashboard (Left-Side) and the same Footer).
 3. Add three containers, one for 'User Analytics per Month' (using recharts library), other one for 'New Join Members' and finally the last one for 'Latest New Orders'.
 4. Make a request to Database to get the latest New Users and Orders (inside getServerSideProps()) for filling 'New Join Members' and 'Latest New Orders' containers
 42. MAKE GET ENDPOINT FOR 'STATS'
  1. Create a file at 'api/users/getStats'
  2. Use 'isAuth' middleware to check valid Token
  3. From User collection, use aggregate method to make a different query, it allows to extract in an array the Months (as '_id') and Total Users of that month (as 'Total') Response Ex: [{"id": 5, "total": 3}], this returns the Total New Users.
 43. MAKE CHART
  1.  Inside useEffect() Hook call getStats(), it allows to get the number of registered Users per month
  2.  In useEffect() Hook (Before calling getStats()) define an Array with all months, then inside getStats() make a GET request to 'api/users/getStats' which returns an array which 'id' refers to Month and 'total' refers to Total registered users in that month (Response Ex: [{"id": 5, "total": 3}])
  3. After fetching data in getStats(), sort the array min to max (saved at 'res' var), then make a new Array which contains objects for each month and its Total new Users like: [ 0: {name: 'Aug', Total Users: 5}, 1: {...}], month Name exists for looping MONTHS Array, so to get the month Name just refer each _id property to that Array, finally mount to 'userStats' state the resulted Array.
  4. Pass to chart component 'userStats' info. and 'dataKey' property must to be equal to 'Total Users' property from userStats (sort-response).
44. MAKE A REDIRECTION BUTTON to '/admin/allUsers' and '/admin/allOrders' in Left-Side (Dashboard)
  1. Get All Users and Orders inside 'getServerSideProps()' then, pass that data (through props) to component and looping each Array render the data using DataGrids components (MaterialUI) 
  2. Set Delete Button in last column for Orders and Users DatGrid which make a DELETE request to `/api/users/delete/${id}` for remove User / Order from database.
45. UPDATE 'isAdmin' property for Users
  1. Add a 'Up to Admin Button' next to 'Delete Button', which fires a function that makes a PUT request to '/admin/users/update/${id}' to change 'isAdmin' prop to true in database
  46. ADD 'GO BACK BUTTON'
  1. Create customButton which returns previous page, use this component in LayoutAdmin component (Using useRouter() from Next/router to redirect previous page)
  2. Fix a bug in App Bar, while not selecting an item from dropdown the page broken.