const port = 3002;
const axios = require('axios');
const express = require('express');
const cors = require('cors')
const app = express();
const parseString = require('xml2js').parseString;

let fetchPics = function(req,res){
    console.log(req.body);
    axios.get("https://api.flickr.com/services/feeds/photos_public.gne?tags="+req.body.search_term).then(response => {
        parseString(response.data, function(err,result){
            let img_obj;
            let img_url_array = [];
            
            console.log(response.data);
            if(result.feed.entry==undefined){
                throw Error(response.statusText);
            }
            //Each flickr post is stored in a <title> tag which make up the <entry> array
            result.feed.entry.forEach(element => {
                //the link to the actual image file is the second <link> tag inside the <entry>
                img_obj = element.link[1];
                //The XML Parser added a dollar sign key into the img_obj, so access with this. 
                img_url_array.push(img_obj['$'].href);
            });
            res.send(img_url_array);
        });        
    }).catch(error=>{
        console.log(error);
        let error_obj = {"message":"something went wrong"};
        res.send(error_obj);
    });    
}

app.use(cors());
app.use(express.json());
app.post('/fetchPics', fetchPics);
app.listen(port);
console.log("");
console.log("Application Server listening on port: "+ port);
