# assessment

nodejs express mongodb practice

### create a .env file and paste the below in it and save in the root of the project

    SERVER_EMAIL=testingtestingauth@gmail.com
    SERVER_PASS=testing.123@TEST
    HOST=localhost
    PORT=8080
    SECRET_KEY=3pillar

### add a valid mongoDB connection string in db config

    src\configs\database.config.js

### todos api testing how to's

- regist user api
	  curl --location --request POST 'localhost:8080/users/register' \
	  --header 'Content-Type: application/json' \
	  --data-raw '{
	  "firstName":"name",
	  "lastName":"surname",
	  "email":"test@mail.com",
	  "password":"p@ssword"
	  }'

- login user api
	  curl --location --request POST 'localhost:8080/users/login' \
	  --header 'Content-Type: application/json' \
	  --data-raw '{
	  "email":"test@mail.com",
	  "password":"abcdef"
	  }'

* forgot password user api
		curl --location --request POST 'localhost:8080/users/forgotPassword' \
		--header 'Content-Type: application/json' \
		--data-raw '{
		"email":"test@mail.com",
		}'
* reset password user api
		curl --location --request POST 'localhost:8080/users/resetPassword' \
		--header 'Content-Type: application/json',
		token: 'jwt token here' \
		--data-raw '{
		"password":"p@ssword"
		}'
* add notes api
		curl --location --request POST 'localhost:8080/notes/add' \
		--header 'Content-Type: application/json',
		token: 'jwt token here' \
		--data-raw '{
		"message":"new note3" ,
		"type": "open",
		"userId":"60c852c6c94fb189acab3bb3"
		}'
* get all notes api
		curl --location --request POST 'localhost:8080/notes/getNotes' \
		--header 'Content-Type: application/json',
		token: 'jwt token here' \
		--data-raw '{
		"userId":"60c852c6c94fb189acab3bb3"
		}'
*update notes api
		curl --location --request POST 'localhost:8080/notes/updateNote' \
		--header 'Content-Type: application/json',
		token: 'jwt token here' \
		--data-raw '{
		"id": "60cfad1a1bfbc827e0c58fd9",
		"message": "new note updated",
		"type": "complete"
		}'
* delete notes api
		curl --location --request POST 'localhost:8080/notes/deleteNote' \
		--header 'Content-Type: application/json',
		token: 'jwt token here' \
		--data-raw '{
		"id": "60cfad1a1bfbc827e0c58fd9"
		}'