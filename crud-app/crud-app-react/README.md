# A Simple React CRUD App

Backend of this web-app is available on this [link](https://github.com/AtiqurRahmanAni/node-express-api)

### Features
- User can add users
- User can update his information 

### How to run this project
- Clone the repository
- Go to the project directory
- create `.env` file
- Copy everything from the `.env.example` file
- Assign values.
- Run `npm i` and then `npm run dev`
- To run this project in production mode, first build the project using `npm run build`, and then use `npm run preview` to run.

There is a `VITE_API_BASE_URL` variable in the `.env` file. The value of this variable will be the base url of the backend. For example, if the backend runs on `http://localhost:4000`, the value of the variable will be this url.
