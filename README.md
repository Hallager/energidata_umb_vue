# Vite and Umbraco

Vite.AspNetCore is used to build and serve the front-end assets. 

Umbraco is used to manage the content and stores url references to api data, which is then used by the front-end to fetch data. 
front-end fetches data using the Umbraco delivery API, then renders html.

## tech stack
Vite and vue are used to build the front-end assets. and the front-end assets are served by the Vite.AspNetCore middleware in umbraco when the site is in development mode, and in production mode the front-end assets are build and served by the umbraco site.