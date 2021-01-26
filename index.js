const express = require('express');
const webPush = require('web-push');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
app.use(express.static(path.join(__dirname, 'client')));

// const vapidKeys = webpush.generateVAPIDKeys();

// console.log(publicVapidKey, privateVapidKey)

// Replace with your email
webPush.setVapidDetails('mailto:bocibiw276@eamarian.com', publicVapidKey, privateVapidKey);


app.use(require('body-parser').json());

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/subscribe', (req, res) => {
    const subscription = req.body

    res.status(201).json({});

    const payload = JSON.stringify({
        title: 'Push notifications with Service Workers',
    });
    console.log(subscription)
    webPush.sendNotification(subscription, payload)
        .catch(error => console.error(error));
});


app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});