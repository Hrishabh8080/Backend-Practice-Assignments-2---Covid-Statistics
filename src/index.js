const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
// const { data } = require('./data')
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')

let infected = 0, recovered = 0, death = 0, hotspot = [], healthy = [];

data.map((item) => {
    // console.log(infected);

    infected += parseInt(item.infected);
    recovered += parseInt(item.recovered);
    death += parseInt(item.death);

    hotspot.push({ state: item.state, rate: { $round: [((infected - recovered) / infected), 5] } })
    healthy.push({ state: item.state, rate: { $round: [(death / infected), 5] } })
})

app.get('/totalRecovered', (req, res) => {

    let result = { data: { _id: "total", recovered: recovered } }
    res.status(200).send(JSON.stringify(result));

})

app.get('/totalActive', (req, res) => {

    let result = { data: { _id: "total", active: infected } }
    res.status(200).send(JSON.stringify(result));

})

app.get('/totalDeath', (req, res) => {

    let result = { data: { _id: "total", death: death } }
    res.status(200).send(JSON.stringify(result));

})

app.get('/hotspotStates', (req, res) => {

    let result = { data: [hotspot] }
    res.status(200).send(JSON.stringify(result));

})

app.get('/healthyStates', (req, res) => {

    let result = { data: [healthy] }
    res.status(200).send(JSON.stringify(result));

})




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;