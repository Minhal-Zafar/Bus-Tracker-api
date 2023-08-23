import fetch from 'node-fetch';
import mongoose from 'mongoose';


mongoose.connect("mongodb://127.0.0.1:27017/busAPI");

const postSchema = new mongoose.Schema({
  vid:{
    type:String,
    required:true
  },
  tmstmp:{
    type:String,
    required:true
  },
  lat:{
    type:String,
    required:true
  },
  lon:{
    type:String,
    required:true
  },
  hdg:{
    type:String,
    required:true
  },
  pid:{
    type:Number,
    required:true
  },
  rt:{
    type:String,
    required:true
  },
  des:{
    type:String,
    required:true
  },
  pdist:{
    type:Number,
    required:true
  },
  dly:{
    type:Boolean,
    required:true
  },
  tatripid:{
    type:String,
    required:true
  },
  origtatripno:{
    type:String,
    required:true
  },
  tablockid:{
    type:String,
    required:true
  },
  zone:{
    type:String,
    required:false
  },
});

const Post = mongoose.model('Vehicle',postSchema);

async function getPost(){
  const myPosts = await fetch("https://ctabustracker.com/bustime/api/v2/getvehicles?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&format=json");
  const response = await myPosts.json();
  
  for(let i=0;i<response['bustime-response']['vehicle'].length;i++){
    const post = new Post({
        vid:response['bustime-response']['vehicle'][i]['vid'],
        tmstmp:response['bustime-response']['vehicle'][i]['tmstmp'],
        lat:response['bustime-response']['vehicle'][i]['lat'],
        lon:response['bustime-response']['vehicle'][i]['lon'],
        hdg:response['bustime-response']['vehicle'][i]['hdg'],
        pid:response['bustime-response']['vehicle'][i]['pid'],
        rt:response['bustime-response']['vehicle'][i]['rt'],
        des:response['bustime-response']['vehicle'][i]['des'],
        pdist:response['bustime-response']['vehicle'][i]['pdist'],
        dly:response['bustime-response']['vehicle'][i]['dly'],
        tatripid:response['bustime-response']['vehicle'][i]['tatripid'],
        origtatripno:response['bustime-response']['vehicle'][i]['origtatripno'],
        tablockid:response['bustime-response']['vehicle'][i]['tablockid'],
        zone:response['bustime-response']['vehicle'][i]['zone'],
     });
    post.save();
  }
}

getPost();