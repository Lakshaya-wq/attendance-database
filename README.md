# attendance-database

**attendance-database** is an attendance management system project written in NodeJS, with Express, EJS and MongoDB.

## Key Features

-   User-friendly UI
-   Ability to mark the attendance
-   Ability to view the attendance marked and also download it as a spreadsheet
-   Ability to view attendance for a particular student
-   Ability to manage the students (add, delete, edit)
-   Secured with username-password authentication, which needs to be repeated every six hours

## Technologies Used

-   [Express](https://expressjs.com)
-   [MongoDB](https://www.mongodb.com/)
-   [NodeJS](https://nodejs.org/)
-   [Bootstrap](https://getbootstrap.com/)
-   [EJS](https://ejs.co)

## Screenshots

### Login Screen

![Login Screen](https://i.imgur.com/87JvRQL.png)

### Index Page

![Index Page](https://i.imgur.com/WHjYaek.png)

## Cloning

```bash
# clone it
git clone https://github.com/lakshaya-wq/attendance-database.git

cd attendance-database

# install modules
yarn # or `npm i` / `npm install`

# copy sample config
cp .env.example .env

# dev start
yarn dev # or npm run dev

# production start
yarn start # or npm start

# **running on http://localhost:3000**
```

## Running on Docker

```bash
docker build -t attendance-database .
docker run -td -p 3000:3000 attendance-database:latest

# **running on http://localhost:3000**
```

## Upcoming

-   Creating new standards/classes

## Contributing

This project is open for any contributions, improvements, or suggestions. Any issues are welcome too.

### Pull requests

Pull Requests are welcome. To contribute, open an issue first, to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
