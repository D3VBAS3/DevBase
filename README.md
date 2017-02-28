# DevBase
A web hosted application that allows developers to easily connect their projects to a hosted database for rapid in-development testing.

## Features
+ Custom middleware package for ExpressJS
+ Automated table and schema creation
+ Real time datastore visualization
+ Secure sessions using JWTs

## Getting Started
Note: DevBase is currently in development, the following instructions illustrate client use when DevBase is deployed.

1. Go to DevBase hosted url (eg www.devbase.io or similar).
2. Create a session ID and password and log in.
3. Copy code snippet from the landing page and paste it and the anywhere (we recommend at the bottom) of your Express server file.
4. Add the BASE function to any routes that would normally interact with a database as a middleware function, and apply the appropriate command (READ, WRITE etc).
5. View your database table in real time in the browser while your application runs

Note: Closing out of the DevBase webpage will invalidate your token, you will need to re-login and copy the code again, as it contains a session token.


## For Contributors
We encourage new contributions!

Some goals that new contributors can work towards:
+ CSS styling of web page
+ Additional DB commands (besides Read/Write)
+ functionality for multiple tables and table relationships
