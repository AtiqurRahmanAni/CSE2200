### How to run frontend
- Go to the frontend directory
- create `.env` file
- Copy everything from the `.env.example` file
- Assign values
- Run `npm i` and then `npm run dev`
- To run this project in production mode, first build the project using `npm run build`, and then use `npm run preview` to run.

There is a `VITE_API_BASE_URL` variable in the `.env` file. The value of this variable will be the base url of the backend. For example, if the backend runs on `http://localhost:4000`, the value of the variable will be this url.


### How to run backend
- Go to the project directory
- create `.env` file
- Copy everything from the `.env.example` file
- Assign values
- Run `npm i` and then `npm run dev`
  
There is an `ALLOWED_ORIGIN` variable in the `.env` file. The value of this variable will be the url of the frontend. For instance, if the frontend runs on `http://localhost:5173`, the value of the variable will be this url.

### APIs
Import this [file](https://drive.google.com/file/d/1xWTqcSCdO2-TtcXwNH8PnKAYfoIbBobR/view?usp=sharing) to the **Postman**.
