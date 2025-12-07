const express = require("express");
const fs = require("fs");
const path = require("path");

const {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    celsiusToKelvin,
    kelvinToCelsius
} = require("./tempConverter");

const app = express();
const PORT = process.env.PORT || 3000;

// Persistent logs directory (this will map to Docker volume)
const logFile = path.join("/app/logs", "logs.txt");

// Function to write logs
function writeLog(message) {
    const timestamp = new Date().toISOString();
    const line = `${timestamp} - ${message}\n`;
    fs.appendFileSync(logFile, line);
}

// Routes
app.get("/c-to-f/:value", (req, res) => {
    const result = celsiusToFahrenheit(Number(req.params.value));
    writeLog(`Celsius to Fahrenheit | Input: ${req.params.value} | Output: ${result}`);
    res.json({ result });
});

app.get("/f-to-c/:value", (req, res) => {
    const result = fahrenheitToCelsius(Number(req.params.value));
    writeLog(`Fahrenheit to Celsius | Input: ${req.params.value} | Output: ${result}`);
    res.json({ result });
});

app.get("/c-to-k/:value", (req, res) => {
    const result = celsiusToKelvin(Number(req.params.value));
    writeLog(`Celsius to Kelvin | Input: ${req.params.value} | Output: ${result}`);
    res.json({ result });
});

app.get("/k-to-c/:value", (req, res) => {
    const result = kelvinToCelsius(Number(req.params.value));
    writeLog(`Kelvin to Celsius | Input: ${req.params.value} | Output: ${result}`);
    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
