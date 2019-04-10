require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session({
    store: new FileStore(),  // no options for now
    secret: process.env.SESSION_SECRET
}));

app.get('/', (req, res) => {
    res.send(`
        <h1>Do The Thing</h1>
    `);
});

app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`)
});