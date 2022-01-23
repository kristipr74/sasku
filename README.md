# sasku

## Saku andmebaasi/database API

You have to download node in your computer

- https://nodejs.org/en/download/

# Run project

- git clone https://github.com/kristipr74/sasku
- cd sasku
- npm install
- npm start
  Go to http://localhost:3000/ping

# HTTP request methods

- GET
- POST
- PATCH
- DELETE

### Endpoints:

- players
- games
- groups
- results
- rounds

### Respond codes

```
ok: 200,
created: 201,
noContent: 204,
badRequest: 400,
notAuthorized: 401,
notFound: 404,
```

### Typescript

- Package.json faili loomine: npm init -y
- Typescripti paigaldamine: npm install typescript
- tsconfig.json faili (typescripti seaded) loomine: npx tsc --init 
- Node tüübidefinitsioonide paigaldamine: npm install @types/node --save-dev
- npm install --save-dev ts-node nodemon

### Express

- npm install --save express
- npm install --save @types/express

#### Main methods

```
app.get()
app.post()
app.delete()
app.put()
app.use()
app.listen()
```
#### Request object method
```
req.body
req.params
req.query
req.method
req.baseUrl
```
#### Response object method
```
res.end()
res.json({key: value})
res.status(code)
```


## API documentation:

Documentation is mad with Swagger

Start project - npm start
Start test - npm run test

Go to http://localhost:3000/api-docs/
