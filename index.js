const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const path = require("path");
const app = express();
const port = 80;
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("018fb5375692434d874dcb07fedd492d");

app.use(bodyParser.urlencoded({ extended: true }));
// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

newsapi.v2.everything({
        sources: "the-hindu",
        language: "en",
        sortBy: "relevancy",
        // country: "in" // use "topHeadlines" in the place "everything"
}).then((response) => {
    var newsNumber = 2;

    
    // const content = response.articles[newsNumber].content;
    // console.log(content);
    // const index = response.articles[newsNumber].index;
    const url = response.articles[newsNumber].url;
    const image = response.articles[newsNumber].urlToImage;
    const title = response.articles[newsNumber].title;
    const description = response.articles[newsNumber].description;
    // console.log(response.articles[newsNumber].description);
    const source = response.articles[newsNumber].source.name;
    // console.log(source);
    let publishedOn = response.articles[newsNumber].publishedAt;
    
    

    // Converting from UTC to IST
    let date = new Date(publishedOn);
    const istDate = date.toString();

    app.get("/", (req, res) => {
        const params = {
            title: title,
            content: description,
            image: image,
            url: url,
            publishedOn: istDate,
            sourceName: source,
        };
        res.status(200).render("index.pug", params);
    });
    app.post('/', (req, res)=>{
        const newsNumber = req.body.newsNumber;
        // console.log(newsNumber);

        if(newsNumber >= 20) {
            res.send("<h1>Oops ! Please enter a number below 20.</h1>");
        }

        const url = response.articles[newsNumber].url;
        const publishedOn = response.articles[newsNumber].publishedAt;
        const image = response.articles[newsNumber].urlToImage;
        const title = response.articles[newsNumber].title;
        const description = response.articles[newsNumber].description;
        // console.log(response.articles[newsNumber].description);
        const source = response.articles[newsNumber].source.name;

        // Converting from UTC to IST
        let date = new Date(publishedOn);
        const istDate = date.toString();

        
        const params = {
            title: title,
            content: description,
            image: image,
            url: url,
            sourceName: source,
            publishedOn: istDate,
        };
        res.status(200).render("index.pug", params);
    });
});
    
app.listen(port, () => {
    console.log("Server started on port " + port);
});
