'use strict';

const express = require('express');

const PORT = 3333;
const HOST = '0.0.0.0';
const AUTHOR = 'Damian Ciechan'

const app = express();

app.get('/', (req, res) => {
    const ip_forwarded = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const current_datetime = new Date().toLocaleString('pl-PL', {timeZone: timezone});
    let response = `
    Twoje IP to: ${ip_forwarded}<br/>
    `
    if(req.headers?.host.includes('localhost')) {
        response += `
        Aplikacja uruchomiona na ${req.headers.host}, wyswietlam czas systemowy: <br>
        Twoja strefa czasowa to: ${timezone}<br/>
        Twój czas to: ${current_datetime}<br/>
        `
    }
  res.send(response);
});

app.listen(PORT, HOST);

console.log(`Kontener uruchomiony na porcie ${PORT} w dniu ${new Date().toLocaleString('pl-PL')}`);
console.log(`Autorem jest ${AUTHOR}`);