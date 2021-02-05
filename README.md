# FINAL PROJECT: MEJORPRECIO
Back part of final project. <br>
Front part on: https://github.com/adrianoosses/final-front
## TABLE OF CONTENTS
1. [ SET UP ](#set-up) :rocket:
2. [ DATABASE ](#db) :rocket:
3. [ RUN ](#run) :rocket:
4. [ TECHNOLOGIES USED ](#tech) :rocket:
5. [ AUTHOR ](#author) :rocket:

<a name="set-up"></a>
## SET UP
<a name="db"></a>
### Option 1: Heroku
### Option 2: local
1. Clone the repository into your machine 
```
git clone <name-of-this-repo.git>
```
2. Create a file ".env" on root path with:
```
DB_PASSWORD=<your-data-base-password>
DB_USERNAME=<your-data-base-user-name>
DB_DATABASE=<your-data-base-name>
DB_DIALECT=mysql
DB_HOST=127.0.0.1
```
3. Install the dependencies typing on terminal:
```
npm install
```

4. Create the migrations typing:
```
npx sequelize db:migrate
```
## DATA BASE
![Database](images/diagram12.svg)
<a name="run"></a>
## RUN
Option 2: local enviorement
Type:
```
nodemon app.js
```

### Endpoints
#### User
| VERB| PATH|DESCRIPTION|AUTH|ISADMIN|
| ----- | ---- | ---- | ---- | ---- |
| POST | ```/user``` | Add a new user on DB |  |  |
| POST | ```/user/login``` | Login with user |  |  |
| GET | ```/user``` | Return all users on DB |  |  |
| GET | ```/user?email=<email>```| Return an user given email |  |  |
| GET | ```/user/list``` | Return list of users and products por admin view |  | x |
| POST | ```/product``` | Add a new product on DB |  |  |
| GET | ```/product?page=${page}``` | Return [12*(page-1), 12*(page-1) + 12] products on DB |  |  |
| GET | ```/product/details?id=<id>```| Return an product given id |  |  |
| DELETE | ```/product?id=<id>``` | Return products given id | x |  |
| POST | ```/offer``` | Add a new offer on DB |  |  |
| GET | ```/offer?email=<email-to>``` | Return all offers received |  |  |
| POST | ```/productfavorite``` | Add a new product to favorites on DB |  |  |
| GET | ```/productfavorite?email=<email-to>``` | Return all favorite products of an user |  |  |
| POST | ```/userscore``` | Add a new score to an user on DB |  |  |
| GET | ```/userscore?email=<email-to>``` | Return average of user score |  |  |
| POST | ```/image``` | Add a new product image |  |  |
| GET | ```/image?product=<id>``` | Get product images |  |  |



<a name="tech"></a>
## TECHNOLOGIES USED
- JavaScript
- Node
- Sequelize
- MySQL
- Express
- Axios
- JWT
- BCRYPT
- DOTENV

<a name="author"></a>
## AUTHOR
Adriano Osses