const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

const API_KEY = process.env.REST_COUNTRIES_API_KEY;

// Get all countries
app.get("/api/countries", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.restcountries.com/countries/v5",
            { headers: { Authorization: `Bearer ${API_KEY}`  } }
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch countries" });
    }
});

// Get countries by region
app.get("/api/countries/region/:region", async (req, res) => {
    try {
        const { region } = req.params;

        const response = await fetch(
            `https://api.restcountries.com/countries/v5/region/${region}`,
            { headers: { Authorization: `Bearer ${API_KEY}` }  }
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch countries" });
    }
});

// Get one country by name
app.get("/api/countries/name/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const url = `https://api.restcountries.com/countries/v5/names.common?q=${encodeURIComponent(name)}`;        

        const response = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
        const data = await response.json();
        res.status(response.status).json(data);

    } catch (error) {
        console.error("SERVER ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch country"
        });
    }
});

// Get country by its country code
app.get("/api/countries/alpha/:code", async (req, res) => {
    try {
        const { code } = req.params;

        const response = await fetch( `https://api.restcountries.com/countries/codes.alpha_2/${encodeURIComponent(code)}`,
            { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch border country",
        });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});