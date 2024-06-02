import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

var API_URL = process.env.API_URL;

//app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("index.ejs", { content : [], error: null });
    //console.log(req.body);
});

app.post('/get-ip', async (req,res) => {
    const ip_id = req.body.ip;
    // try {
    //     const result = await axios.get(API_URL + ip_id + "/json");
    //     console.log(JSON.stringify(result.data));
    //     res.render("index.ejs", { content : [result.data] });
    //     //console.log(content);
    // } catch(error) {
    //     console.log("error");
    //     res.status(404);
    //     //res.render("index.ejs", {content : JSON.parse(error.response.data)});
    // }   

    try {
        const result = await axios.get(API_URL + ip_id + "/json");
        console.log(JSON.stringify(result.data));
        // res.render("index.ejs", { content: [result.data], error: null });
        if (result.data.error) {
            res.render("index.ejs", { content: [], error: result.data.reason });
        } else {
            res.render("index.ejs", { content: [result.data], error: null });
        }
    } catch (error) {
        console.error("Error fetching IP data:", error);
        res.status(404).render("index.ejs", { content: [], error: "IP address doesn't exist" });
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
