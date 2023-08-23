import fetch from 'node-fetch';
import mongoose from 'mongoose';
import { Double } from 'mongodb';


mongoose.connect("mongodb://127.0.0.1:27017/busAPI");

const postSchema = new mongoose.Schema({
  stpid:{
    type:String,
    required:true
  },
  stpnm:{
    type:String,
    required:true
  },
  lat:{
    type:Number,
    required:true
  },
  lon:{
    type:Number,
    required:true
  },
});

const Post = mongoose.model('stops',postSchema);

async function getPost(){
  const myPosts = await fetch("https://ctabustracker.com/bustime/api/v2/getstops?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=7&dir=Eastbound&format=json");
  const response = await myPosts.json();
  
  for(let i=0;i<response['bustime-response']['stops'].length;i++){
    const post = new Post({
        stpid:response['bustime-response']['stops'][i]['stpid'],
        stpnm:response['bustime-response']['stops'][i]['stpnm'],
        lat:response['bustime-response']['stops'][i]['lat'],
        lon:response['bustime-response']['stops'][i]['lon'],
     });
    post.save();
  }
}

getPost();