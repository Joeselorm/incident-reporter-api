const env = require('dotenv').config();
const axios = require('axios');

const pool = require('../../connect');
const queries = require('./queries');

const app_id = process.env.APP_ID || '8fd0714fe8406f47228c86bfd72f8ebe';

const getIncidents = (req, res) => {
    pool.query(queries.getIncidents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });    
};

const getIncidentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getIncidentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const reportIncident = (req, res) => {
    const { client_id, incident_desc, city, country, date } = req.body;
    // Check if incident has already been reported
    pool.query(queries.checkIncidentReported, [client_id, incident_desc, city, date], (error, results) => {
        if (results.rows.length) {
            res.send('Incidient has already been reported.');
            return;
        }                  

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8fd0714fe8406f47228c86bfd72f8ebe`)
        .then((response)=>{                        
            // Get weather Data
            weather = response.data;            
            
            // add Incident to db
            pool.query(queries.addIncident, [client_id, incident_desc, city, country, date, weather], (error, results) => {
                if (error) throw error;
                res.status(201).send("Incidient reported successfully");
                // console.log("Incidient reported successfully");
                // console.log(weather);
            });
        })
        .catch((error)=>{            
            weather = error;
        });
        
    });
};

module.exports = {
    getIncidents,
    getIncidentById,
    reportIncident    
};
