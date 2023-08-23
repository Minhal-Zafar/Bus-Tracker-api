import fetch from 'node-fetch';
import mongoose from 'mongoose';


mongoose.connect("mongodb://127.0.0.1:27017/busAPI");

const postSchema = new mongoose.Schema({
  dir:{
    type:String,
    required:true
  },
});

const Post = mongoose.model('directions',postSchema);

async function getPost(){
  const myPosts = await fetch("http://ctabustracker.com/bustime/api/v2/getdirections?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&format=json");
  const response = await myPosts.json();
  
  for(let i=0;i<response['bustime-response']['directions'].length;i++){
    const post = new Post({
        dir:response['bustime-response']['directions'][i]['dir'],
     });
    post.save();
  }
}

getPost();