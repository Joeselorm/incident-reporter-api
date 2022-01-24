const env = require('dotenv').config();
const express = require('express');

const incidentRoutes = require('./src/incidentsreport/routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send('Hello World');    
});

app.use("/api/v1/incident", incidentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
