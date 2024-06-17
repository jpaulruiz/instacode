Viewing app without NODE server.
  1. Open "dist" folder
  2. Open index.html in the browser
    2.1 If not able to run due to CORS,
      just run a web server in your unit
      then open the index.html

Viewing app using NODE server.
  1. install npm
      you can download from here https://nodejs.org/en/download/package-manager
  2. install pnpm using npm
    npm install -g pnpm
  3. install packages
    pnpm i
  4. run app
    pnpm run dev
  5. open the suggested server
    example (http://localhost:5173/dist)
    this has '/dist' due to configured baseURL in vite.config.ts