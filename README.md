# Mock Property Rental Site Built with Next.js 14
Full CRUD for properties, user authentication and messaging, and searching and bookmarking properties. Using NextAuth for Google sign-in and MongoDB via Mongoose.
---
## Features
- User authentication with Google and Next Auth
- User authorization
- User profile with user listings
- Internal user messaging with 'unread' notifications
- Route protection
- Property/User data validation and formatting
- Property Listing CRUD
- Property Listing multi-image upload to Cloudinary
- Property Listing search
- Photoswipe image gallery
- Mapbox maps
- Toast notifications
- Property Listing bookmarking
- Property Listing sharing to social media
- Responsive UI with Tailwind CSS
- Custom 404 page

## Packages Used
- Next.js
- React.js
- Tailwind CSS
- MongoDB
- Mongoose
- NextAuth.js
- Validator.js
- React Icons
- Cloudinary
- Mapbox
- React Map GL
- React Geocode
- React Spinners
- React Toastify
- React Share
- Chalk (for nicer DX)

## Miscellaneous
Built with Node v20; .nvmrc in repo.
<<<<<<< Updated upstream
=======

<<<<<<< Updated upstream
## High Level TODOs
- Tighten up and polish UI design since it's pretty wonky all over.
- Convert most client components into server ones since all they're doing is fetching data usually. Use server actions.
- Add model imports in any component that even *thinks* about referencing them because Mongoose has occasional random hiccups with models not being defined and necessitates restarting server.
- Rewrite property fetching utils from early on to actually account for most (or all... unless?) cases, or get rid of it entirely if it doesn't make sense anymore.
- Abstract some redundant shiz into utils or components, DRY things up.
- Fix mixed naming for component directories, reshuffle components directory itself
- Add .eslintrc, ensure everything gets reformatted since I'm not happy with Prettier.
- Skim through and ensure naming is still sensible, add comments.
- Eventually fork a TypeScript version.
=======
## Known Issues
- When deploying fresh to Vercel, none of the project's CSS files get included in the markup and so don't load, leaving a vanilla HTML page. This seems to be a not-unheard-of issue when deploying Next to Vercel. Hack workaround seems to be including a dummy CSS file in the root layout.
>>>>>>> Stashed changes
>>>>>>> Stashed changes
