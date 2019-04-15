const express = require("express");
const app = express();
const Router = express.Router;
const completedTicketsRoutes = Router();
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: "b9dbc1cb",
    apiSecret: "nX9TJeg6zs4AzOgo"
}, { debug: true });

const { completedTicketsPage } = require("../controllers/completedTickets");

completedTicketsRoutes.get("/", completedTicketsPage);
//Index value for SMS Message
app.get('/', (req, res) => {
    res.render('index')
});

// Catch form submit SMS messages
app.post('/', (req, res) => {
    //res.send(req.body);
    //console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(
        '17576933212', number, text, { type: 'unicode' },
        (err, responseData) => {
            if (err) {
                console.log(err);

            } else {
                console.dir(responseData);
                // Get data from response
                //const data = {
                //id: responseData.messages[0]['message-id'],
                //number: responseData.messages[0]['to']
            }
        }
    );
});
module.exports =
    completedTicketsRoutes;

