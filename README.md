1. Create Layout component to wrap application an d making the structure of main page
2. Install and adding Material UI
3. Update components with material UI classes
4. Modify _app.jsx & _document.jsx to avoid refreshing styles for Material UI
5. Create dummy data at utils folder
6. Render at index.jsx all products as a Image component (using map) and binding props
7. Making card structure for each product/item
8. Modify NextJS Header Tag for each page in our site (SEO performance)
9. Make page structure for each product using Grid styles (MaterialUI-Flexbox)
10. Create a 'ThemeProvider' context that wraps all the application up (All inside Layout tag). (Modifying primary, secondary colors and the typography styles)
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
17.    
