import fetch from 'node-fetch';
import mongoose from 'mongoose';


mongoose.connect("mongodb://127.0.0.1:27017/busAPI");

const postSchema = new mongoose.Schema({
  seq:{
    type:Number,
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
  typ:{
    type:String,
    required:true
  },
  stpid:{
    type:String,
    required:true
  },
  stpnm:{
    type:String,
    required:true
  },
  pdist:{
    type:Number,
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
});

const Post = mongoose.model('Vehicle',postSchema);

async function getPost(){
  const myPosts = await fetch("https://ctabustracker.com/bustime/api/v2/getpatterns?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&pid=954&format=json");
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