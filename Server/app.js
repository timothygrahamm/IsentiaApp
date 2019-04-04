const port = 3002;
const axios = require('axios');
const express = require('express');
const cors = require('cors')
const app = express();
const parseString = require('xml2js').parseString;

/*
    fetch('http://localhost:3002/fetchPics',
	{	
		method:'POST',
		mode:'cors',
		headers: {
			"Content-Type":"application/JSON"
        },
		body: JSON.stringify({search_term:"funny"})
	}).then(function(response){
	
		console.log(response);
    });
*/

let fetchPics = function(req,res){
    console.log(req.body);
    axios.get("https://api.flickr.com/services/feeds/photos_public.gne?tags="+req.body.search_term).then(response => {
        parseString(response.data, function(err,result){
            let img_obj = result.feed.entry[0].link[1];
            let img_url_array = [];
            result.feed.entry.forEach(element => {
                img_obj = element.link[1];
                img_url_array.push(img_obj['$'].href);
            });
            res.send(img_url_array);
        });        
    }).catch(error=>{
        console.log(error);
    });    
}

app.use(cors());
app.use(express.json());
app.post('/fetchPics', fetchPics);
app.listen(port);
console.log("");
console.log("Application Server listening on port: "+ port);
