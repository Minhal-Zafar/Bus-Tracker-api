import fetch from 'node-fetch';
import mongoose from 'mongoose';


mongoose.connect("mongodb://127.0.0.1:27017/busAPI");

const postSchema = new mongoose.Schema({
  tm:{
    type:String,
    required:true
  },
});

const Post = mongoose.model('system-time',postSchema);

async function getPost(){
  const myPosts = await fetch("https://www.ctabustracker.com/bustime/api/v2/gettime?key=ujAhaYu9dy6TAF2VgMLWK5nnV&format=json");
  const response = await myPosts.json();
  
    const post = new Post({
        tm:response['bustime-response']['tm'],
     });
    post.save();
  }

getPost();