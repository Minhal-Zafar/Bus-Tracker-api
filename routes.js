import fetch from 'node-fetch';
import mongoose from 'mongoose';


mongoose.connect("mongodb://127.0.0.1:27017/busAPI");

const postSchema = new mongoose.Schema({
  rt:{
    type:String,
    required:true
  },
  rtnm:{
    type:String,
    required:true
  },
  rtclr:{
    type:String,
    required:true
  },
  rtdd:{
    type:String,
    required:true
  },
});

const Post = mongoose.model('routes',postSchema);

async function getPost(){
  const myPosts = await fetch("http://ctabustracker.com/bustime/api/v2/getroutes?key=ujAhaYu9dy6TAF2VgMLWK5nnV&format=json");
  const response = await myPosts.json();
  
  for(let i=0;i<response['bustime-response']['routes'].length;i++){
    const post = new Post({
        rt:response['bustime-response']['routes'][i]['rt'],
        rtnm:response['bustime-response']['routes'][i]['rtnm'],
        rtclr:response['bustime-response']['routes'][i]['rtclr'],
        rtdd:response['bustime-response']['routes'][i]['rtdd'],
     });
    post.save();
  }
}

getPost();