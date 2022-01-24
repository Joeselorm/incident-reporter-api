const getIncidents = "SELECT * FROM incidents";
const getIncidentById = "SELECT * FROM incidents WHERE client_id = $1";
const checkIncidentReported = "SELECT i FROM incidents i WHERE i.client_id = $1 AND i.incident_desc = $2 AND i.city = $3 AND i.date = $4";
const addIncident = "INSERT INTO incidents (client_id, incident_desc, city, country, date, weather_report) VALUES ($1, $2, $3, $4, $5, $6)";

module.exports = {
    getIncidents,
    getIncidentById,
    addIncident,
    checkIncidentReported
}