

const hostname = 'localhost';
const port = 3002;
const axios = require('axios');
const express = require('express');
const cors = require('cors')
const app = express();
const parseString = require('xml2js').parseString;

var fetchPics = function(req,res){
    axios.get("https://api.flickr.com/services/feeds/photos_public.gne?tags=funny").then(response => {
        parseString(response.data, function(err,result){
            var img_obj = result.feed.entry[0].link[1];
            console.log(img_obj['$'].href);
        });
        res.send("hullo");
    }).catch(error=>{
        console.log(error);
    });    
}

app.use(cors());
app.get('/fetchPics', fetchPics);
app.listen(port);
console.log("");
console.log("Application Server listening on port: "+ port);
