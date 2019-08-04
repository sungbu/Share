<template>
  <div id="share">
    <div class="header" @mouseleave="hideList">
      <p>S<span>HA</span>RE</p>
      <div class="imgBox" @click="showList">
        <span></span>
        <img src="http://pic.yupoo.com/prince450/4d3de057/2a6eff5c.png">
      </div>
      <ul v-show="listShow">
        <li active>SHARE广场</li>
        <li><router-link class="link" to="/MyShare">我的SHARE</router-link></li>
        <li>个人中心</li>
        <li><router-link class="link" to="/">注销</router-link></li>
        <span></span>
      </ul>
    </div>
    <div class="boxContent">
      <ul>
        <li>
          <div v-for="share in shareCon0" @mouseover="shrink(true)" @mouseleave="shrink(false)">
            <div class="boxTitle">
            <h3>{{share.title}}</h3>
            </div>
            <div class="boxPic">
              <img :src="share.pictrue" alt="">
            </div>
            <div class="boxDes">
              <p>{{share.content}}</p>
              <button>更多</button>
            </div>
          </div>
        </li>
        <li>
          <div v-for="share in shareCon1" @mouseover="shrink(true)" @mouseleave="shrink(false)">
            <div class="boxTitle">
            <h3>{{share.title}}</h3>
            </div>
            <div class="boxPic">
              <img :src="share.pictrue" alt="">
            </div>
            <div class="boxDes">
              <p>{{share.content}}</p>
              <button>更多</button>
            </div>
          </div>
        </li>
        <li>
          <div v-for="share in shareCon2" @mouseover="shrink(true)" @mouseleave="shrink(false)">
            <div class="boxTitle">
            <h3>{{share.title}}</h3>
          </div>
          <div class="boxPic">
            <img :src="share.pictrue" alt="">
          </div>
          <div class="boxDes">
            <p>{{share.content}}</p>
            <button>更多</button>
          </div>
          </div>
        </li>
        <li>
          <div v-for="share in shareCon3" @mouseover="shrink(true)" @mouseleave="shrink(false)">
            <div class="boxTitle">
            <h3>{{share.title}}</h3>
          </div>
          <div class="boxPic">
            <img :src="share.pictrue" alt="">
          </div>
          <div class="boxDes">
            <p>{{share.content}}</p>
            <button>更多</button>
          </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var manageCookie = {
  setCookie: function(name, value, time) {
    document.cookie = name + "=" + value + ";max-age=" + time;
    return this;
  },
  removeCookie: function(name) {
    return this.setCookie(name, "", -1);
  },
  getCookie: function(name, callback) {
    var allCookieArr = document.cookie.split("; ");
    for (var i = 0; i < allCookieArr.length; i++) {
      var itemCookieArr = allCookieArr[i].split("=");
      if (itemCookieArr[0] == name) {
        callback(itemCookieArr[1]);
        return this;
      }
    }
    callback(undefined);
    return this;
  }
};
export default {
  name: "share",
  data() {
    return {
      listShow: false,
      shareCon0: [],
      shareCon1: [],
      shareCon2: [],
      shareCon3: [],
      desShow:false,
      listShow: false
    };
  },
  methods: {
      showList() {
          this.listShow = true;
      },
      hideList() {
          this.listShow = false;
      },
      signOut() {
          manageCookie.removeCookie("username");
      },
      shrink(action) {
        if(action) {  
          event.currentTarget.className = "active"
        }else{
          event.currentTarget.className = ""
        }
      },
      hideList() {
          this.listShow = false;
      }
  },
  created() {
      var index = 0;
      this.$http.get("https://share-news-8ac61.firebaseio.com/post.json")
                .then(function (data) {
                    return data.body
                })
                .then(function (data) {
                    for(var key in data){
                      if(index >= 4) {
                        index = 0;
                      }
                        this['shareCon' + index].push(data[key]);
                        // console.log('shareCon' + index)
                      
                      index++;
                    }
                })
  },
};
// console.log(manageCookie);
</script>

<style scoped>
#share * {
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
#share {
  box-sizing: content-box;
  position: relative;
  width:100%;
  min-width: 1024px;
  min-height: 100vh;
  background-color:#1b1d1c;
}
/* #share .redBar{
  position:absolute;
  top:-150px;
  width:100%;
  height:300px;
  background-color: #ea182e;
  border-radius: 50%;
} */
#share .header{
  position: fixed;
  width:100%;
  height: 60px;
  /* overflow: hidden; */
  z-index:999999;
  background:rgba(224, 224, 224, .9);
}
#share .header ul {
  position: absolute;
  top:60px;
  right:30px;
  background:rgba(171, 169, 169, 1);
  border-radius: 10px;
  /* overflow: hidden; */
}
#share .header ul li {
  text-align: right;
  padding: 5px;
  border-bottom:.5px solid #5b5a5a;
  cursor: pointer;
  padding:10px;
}
#share .header ul li .link{
    color: #000;
}
#share .header ul li:first-child{
    border-top-right-radius:10px;
    border-top-left-radius: 10px;
}
#share .header ul li:nth-child(4){
    border-bottom-right-radius:10px;
    border-bottom-left-radius: 10px;
}
#share .header ul li[active]{
    background-color:#ccc;
}
#share .header ul li:hover{
    background-color:#5b5a5a
}
#share .header ul span {
  position: absolute;
  top: -20px;
  left: 50px;
  width: 0;
  height: 0;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent rgba(171, 169, 169, .5);
  z-index:9999;
}
#share .header p{
  float:left;
  margin-left: 50px;
  font-size: 30px;
  font-weight: 900;
  line-height: 60px;
}
#share .header p span{
  -webkit-text-stroke: 1px #f4f4f4;
  color: transparent;
}
#share .header#active{
  width:0;
}
#share .header#active p{
  display: none;
}
#share .imgBox{
  position: relative;
  float:right;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 50px;
  cursor: pointer;
}
/* #share .imgBox span{
  position: absolute;
  width:100px;
  height:100px;  
  background:rgba(224, 224, 224, .9);

} */
#share .imgBox img{
  width:50px;
}
#share .boxContent{
  position: absolute;
  /* z-index: 99999; */
  top:80px;
}
#share .boxContent ul{
  width:100%;
  text-align: center;
  background-color:#1b1d1c;
}
#share .boxContent ul li{
  position: relative;
  display: inline-block;
  width:20%;
  vertical-align: top;
  margin-left:25px;
}
#share .boxContent ul li>div{
  margin-top:20px;
  cursor: pointer;
}
#share .boxContent ul li .boxTitle{
  background-color: #f4f4f4;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  transition: all .5s ease;
  height:0px;
  overflow: hidden;
}
#share .boxContent ul li .boxTitle h3{
  padding:5px;
  
}
#share .boxContent ul li .boxPic{
  position: relative;
  width:100%;
  height:250px;
  overflow: hidden;
  z-index:99999;
  border-radius: 3px;
  transition: all .5s ease;
}
#share .boxContent ul li .boxPic img{
  position: absolute;
  top:0;
  left:-35%;
  height:250px;
}
#share .boxContent ul li .boxDes{
  background-color: #f4f4f4;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  text-align: left;
  height:0px;
  transition: all .5s ease;
  overflow: hidden;
  font-size:13px;
  text-indent: 1rem;
  font-weight: 400;
  padding:0 5px;
}
#share .boxContent ul li .boxDes p{
  height:100px;
  overflow: hidden;
}
#share .boxContent ul li .boxDes button{
  box-sizing:content-box;
  width:60px;
  height:13px;
  border: none;
  background-color:#ea182e;
  border-radius: 5px;
  padding:5px;
  line-height: 13px;
  margin-top:5px;
  color:#f4f4f4;
  font-weight: 600;
  border:2px solid #f4f4f4;
  letter-spacing: 2px;
  transition: all .5s ease;
  cursor: pointer;
}
#share .boxContent ul li .boxDes button:hover{
  border:2px solid #1b1d1c;
}
#share .boxContent ul li div.active .boxTitle{
  height:40px
}
#share .boxContent ul li div.active .boxDes{
  height: 140px;
}
#share .boxContent ul li div.active .boxPic{
  height:200px;
  border-radius:0;
}
</style>