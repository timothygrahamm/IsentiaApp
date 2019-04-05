import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input()
  url_array = [];

  constructor() {
    
  }

  ngOnInit() {
    this.submitSearchTerm("");
  }

  submitSearchTerm(search_input){
    this.url_array = [];
    fetch('http://localhost:3002/fetchPics',
    {	
      method:'POST',
      mode:'cors',
      headers: {
        "Content-Type":"application/JSON"
          },
      body: JSON.stringify({search_term:search_input})
    }).then( response => {
          return response.json();
      }).then(response => {
          console.log(response);
          if(response.message!="something went wrong"){
            response.forEach(element => {
              console.log(element);
              this.url_array.push(element);
            });
          }
          else{
            this.url_array = null;
          }
          
      });
  }

}
