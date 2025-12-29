import express from "express"
import env from "dotenv";
import axios from "axios"
import cors from "cors"
const app = express();
const port = 3000;
env.config()
app.use(cors())

app.get("/weather", async(req, res)=>{
    try {
        const city= req.query.city
        if(!city){
            return(
            res.status(400).json({error: "City is required"})
            )
        }

        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather",
            {
                params:{
                    q: city,
                    units: "metric",
                    appid: process.env.WEATHER_API_KEY,
                }
            }
        )
        console.log(`Fetching weather for ${city} in metric units...`);

        console.log(response.data)
        res.json(response.data)
    } catch (error) {
    res.status(500).json({ error: "Unable to fetch the weather data" });
    }
} )


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});