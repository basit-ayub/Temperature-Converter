const express = require('express');
const { celsiusToFahrenheit, fahrenheitToCelsius, celsiusToKelvin, kelvinToCelsius } = require('./tempConverter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Temperature Conversion API is running ... ');
});

// Conversion routes
app.get('/c-to-f/:celsius', (req, res) => {
    const celsius = parseFloat(req.params.celsius);
    res.json({ celsius, fahrenheit: celsiusToFahrenheit(celsius) });
});

app.get('/f-to-c/:fahrenheit', (req, res) => {
    const fahrenheit = parseFloat(req.params.fahrenheit);
    res.json({ fahrenheit, celsius: fahrenheitToCelsius(fahrenheit) });
});

app.get('/c-to-k/:celsius', (req, res) => {
    const celsius = parseFloat(req.params.celsius);
    res.json({ celsius, kelvin: celsiusToKelvin(celsius) });
});

app.get('/k-to-c/:kelvin', (req, res) => {
    const kelvin = parseFloat(req.params.kelvin);
    res.json({ kelvin, celsius: kelvinToCelsius(kelvin) });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
