# FINAL PROJECT
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
Option 1: Heroku
Option 2: 
```
git clone <name-of-this-repo.git>
```
## DATA BASE
![Database](images/diagram9.svg)
<a name="run"></a>
## RUN
Option 2:
Type:
```
npm install
nodemon app.js
```

### Endpoints
#### User
| VERB| PATH|DESCRIPTION|AUTH|ISADMIN|
| ----- | ---- | ---- | ---- | ---- |
| GET | /user | Return all users on DB |  | x |
| GET | /user?email=<email>| Return an user given email | x |  |

<a name="tech"></a>
## TECHNOLOGIES USED
- JavaScript
- Node
- Express

<a name="author"></a>
## AUTHOR
Adriano Osses