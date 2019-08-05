<template>
  <div id="myShare">
    <div class="header" @mouseleave="hideList">
      <p>S<span>HA</span>RE</p>
      <div class="imgBox" @click="showList">
        <span></span>
        <img src="http://pic.yupoo.com/prince450/4d3de057/2a6eff5c.png">
      </div>
      <ul v-show="listShow">
        <li><router-link class="link" to="/Share">SHARE广场</router-link></li>
        <li active>我的SHARE</li>
        <li>个人中心</li>
        <li><router-link class="link" to="/">注销</router-link></li>
        <span></span>
      </ul>
    </div>
    <div class="loding">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="boxContent">
      <ul>
        <li>
          <div v-for="share in shareCon0" @mouseover="shrink(true)" @mouseleave="shrink(false)">
            <div class="boxTitle">
            <h3>{{share.title | snipppetHeader}}</h3>
            </div>
            <div class="boxPic">
              <img :src="share.pictrue" alt="">
            </div>
            <div class="boxDes">
              <p>{{share.content | snipppet}}</p>
              <button>修改</button>
            </div>
          </div>
        </li>
        <li>
          <div v-for="share in shareCon1" @mouseover="shrink(true)" @mouseleave="shrink(false)">
            <div class="boxTitle">
            <h3>{{share.title | snipppetHeader}}</h3>
            </div>
            <div class="boxPic">
              <img :src="share.pictrue" alt="">
            </div>
            <div class="boxDes">
              <p>{{share.content | snipppet}}</p>
              <button>修改</button>
            </div>
          </div>
        </li>
        <li>
          <div v-for="share in shareCon2" @mouseover="shrink(true)" @mouseleave="shrink(false)">
            <div class="boxTitle">
            <h3>{{share.title | snipppetHeader}}</h3>
          </div>
          <div class="boxPic">
            <img :src="share.pictrue" alt="">
          </div>
          <div class="boxDes">
            <p>{{share.content | snipppet}}</p>
            <button>修改</button>
          </div>
          </div>
        </li>
        <li>
          <div v-for="share in shareCon3" @mouseover="shrink(true)" @mouseleave="shrink(false)">
            <div class="boxTitle">
            <h3>{{share.title | snipppetHeader}}</h3>
          </div>
          <div class="boxPic">
            <img :src="share.pictrue" alt="">
          </div>
          <div class="boxDes">
            <p>{{share.content | snipppet}}</p>
            <button>修改</button>
          </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="pen" @click="showAdd">
        <img src="./../assets/pen.png" alt="">
    </div>
    <div class="addShare">
        <div class="main" :size="addShare">
            <form v-show="showForm">
                <div class="close" @click="close">
                    <span></span>
                    <span></span>
                </div>
                <div class="title">
                    <label for="">标题：</label>
                    <input type="text" v-model="shareList.title">
                </div>
                <div class="content">
                    <label for="">内容：</label>
                    <textarea v-model="shareList.content"></textarea>
                </div>
                <div class="file">
                    <label for="">附件：</label>
                    <input type="text" v-model="shareList.pictrue">
                </div>
                <button @click="postShare">添加</button>
            </form>
        </div>
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
    name: "myShare",
      data() {
    return {
      index: 0,
      listShow: false,
      shareCon0: [],
      shareCon1: [],
      shareCon2: [],
      shareCon3: [],
      desShow:false,
      listShow: false,
      addShare: false,
      showForm: false,
      shareList: {
        title: "",
        content: "",
        pictrue: ""
      },
      id: "",
      author: ""
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
      },
      showAdd() {
          this.addShare = true;
          this.showForm = true;
      },
      close() {
          this.addShare = false;
          this.showForm = false;
      },
      postShare(e) {
        var self = this;
        var obj = this.shareList;
        e.preventDefault();
        manageCookie.getCookie("id", function(getId) {
            self.id = getId;
        })
        .getCookie("username",function(getAuthor) {
            obj.author = getAuthor;
        })
        this.$http.post("https://user-34638.firebaseio.com/post/" + this.id + ".json",this.shareList)
            obj.data = new Date().toLocaleString();
        this.$http.post("https://share-news-8ac61.firebaseio.com/post.json",obj)
                    .then(function () {
                        this.addShare = false;
                        this.showForm = false;
                        getShare(this,this.index);
                    });
    }
  },
created() {
        getShare(this,this.index);
    }
}
function getShare (self,index) {
    self.shareCon0 = [];
    self.shareCon1 = [];
    self.shareCon2 = [];
    self.shareCon3 = [];
    manageCookie.getCookie("id",function (getId) {
            // console.log("id" + getId);
            self.id = getId;
        })
        self.$http.get("https://user-34638.firebaseio.com/post/"+ self.id + ".json")
                .then(function (data) {
                    return data.body
                })
                .then(function (data) {
                    for(var key in data){
                        if(key.slice(0,1) == '-'){
                            if(data[key]){
                                if(index >= 4) {
                                    index = 0;
                                }
                                    this['shareCon' + index].push(data[key]);
                                    // console.log('shareCon' + index)
                                index++;
                            }
                        }
                    }
                })
}
</script>

<style scoped>
#myShare * {
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
#myShare {
  box-sizing: content-box;
  position: relative;
  width:100%;
  min-width: 1024px;
  min-height: 100vh;
  background-color:#1b1d1c;
}
/* #myShare .redBar{
  position:absolute;
  top:-150px;
  width:100%;
  height:300px;
  background-color: #ea182e;
  border-radius: 50%;
} */
#myShare .header{
  position: fixed;
  width:100%;
  height: 60px;
  /* overflow: hidden; */
  z-index:999999;
  background:rgba(224, 224, 224, .9);
}
#myShare .header ul {
  position: absolute;
  top:60px;
  right:30px;
  background:rgba(171, 169, 169, 1);
  border-radius: 10px;
  /* overflow: hidden; */
}
#myShare .header ul li {
  text-align: right;
  padding: 5px;
  border-bottom:.5px solid #5b5a5a;
  cursor: pointer;
  padding:10px;
}
#myShare .header ul li .link{
    color: #000;
}
#myShare .header ul li:first-child{
    border-top-right-radius:10px;
    border-top-left-radius: 10px;
}
#myShare .header ul li:nth-child(4){
    border-bottom-right-radius:10px;
    border-bottom-left-radius: 10px;
}
#myShare .header ul li[active]{
    background-color:#ccc;
}
#myShare .header ul li:hover{
    background-color:#5b5a5a
}
#myShare .header ul span {
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
#myShare .header p{
  float:left;
  margin-left: 50px;
  font-size: 30px;
  font-weight: 900;
  line-height: 60px;
}
#myShare .header p span{
  -webkit-text-stroke: 1px #f4f4f4;
  color: transparent;
}
#myShare .header#active{
  width:0;
}
#myShare .header#active p{
  display: none;
}
#myShare .loding{
    position:absolute;
    top:80px;
    width:100%;
    text-align: center;
}
#myShare .loding span{
    display:inline-block;
    width:8px;
    height:8px;
    background-color:#f4f4f4;
    border-radius: 50%;
}
#myShare .loding span:nth-child(1){
    animation: move 1s ease infinite .1s;
}
#myShare .loding span:nth-child(2){
    animation: move 1s ease infinite .2s;
}
#myShare .loding span:nth-child(3){
    animation: move 1s ease infinite .3s;
}
@keyframes move{
    0%{
        transform: scale(0.5);
    }
    50%{
        transform: scale(1);
    }
    100%{
        transform: scale(0.5);
    }
}
#myShare .imgBox{
  position: relative;
  float:right;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 50px;
  cursor: pointer;
}
/* #myShare .imgBox span{
  position: absolute;
  width:100px;
  height:100px;  
  background:rgba(224, 224, 224, .9);

} */
#myShare .imgBox img{
  width:50px;
}
#myShare .boxContent{
  position: absolute;
  /* z-index: 99999; */
  top:80px;
}
#myShare .boxContent ul{
  width:100%;
  text-align: center;
  background-color:#1b1d1c;
}
#myShare .boxContent ul li{
  position: relative;
  display: inline-block;
  width:20%;
  vertical-align: top;
  margin-left:25px;
}
#myShare .boxContent ul li>div{
  margin-top:20px;
  cursor: pointer;
}
#myShare .boxContent ul li .boxTitle{
  background-color: #f4f4f4;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  transition: all .5s ease;
  height:0px;
  overflow: hidden;
}
#myShare .boxContent ul li .boxTitle h3{
  padding:5px;
  
}
#myShare .boxContent ul li .boxPic{
  position: relative;
  width:100%;
  height:250px;
  overflow: hidden;
  z-index:99999;
  border-radius: 3px;
  transition: all .5s ease;
}
#myShare .boxContent ul li .boxPic img{
  position: absolute;
  top:0;
  left:-35%;
  height:250px;
}
#myShare .boxContent ul li .boxDes{
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
#myShare .boxContent ul li .boxDes p{
  /* height:100px; */
  overflow: hidden;
}
#myShare .boxContent ul li .boxDes button{
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
  outline: none;
}
#myShare .boxContent ul li .boxDes button:hover{
  border:2px solid #1b1d1c;
}
#myShare .boxContent ul li div.active .boxTitle{
  height:40px
}
#myShare .boxContent ul li div.active .boxDes{
  height: 140px;
}
#myShare .boxContent ul li div.active .boxPic{
  height:200px;
  border-radius:0;
}
#myShare .pen{
    position: absolute;
    bottom: 20px;
    right:30px;
    width:60px;
    height: 60px;
    border-radius: 50%;
    background-color:#ea182e;
    padding: 10px;
    cursor: pointer;
    z-index: 99999;
}
#myShare .pen img{
    width:100%;
}
#myShare .addShare{
    position: absolute;
    right:30px;
    bottom: 20px;
    z-index:999999;
}
#myShare .addShare .main {
    width:0;
    height:0;
    background-color:#f4f4f4;
    border-radius:10px;
    transition: all 1s ease;
}
#myShare .addShare .main[size = "true"]{
    width:700px;
    height:600px;
    padding:20px;
}
#myShare .addShare .close{
    position: absolute;
    top:10px;
    right:20px;
    width:30px;
    height: 30px;
    cursor: pointer;
    /* border:1px solid red; */
}
#myShare .addShare .close span{
    position: absolute;
    top:50%;
    height:50%;
    transform: translate(0,-50%);
    width:100%;
    height:4px;
    background-color: #262827;
    border-radius: 5px;
}
#myShare .addShare .close span:nth-child(1){
    transform: rotateZ(45deg);
}
#myShare .addShare .close span:nth-child(2){
    transform: rotateZ(-45deg);
}
#myShare .addShare .title{

}
#myShare .addShare .content{

}
#myShare .addShare .file{
    
}
#myShare .addShare div label{
    display: block;
    font-size:18px;
    letter-spacing: 2px;
    color:#262827;
}
#myShare .addShare div input,#myShare .addShare div textarea{
    margin-left:4rem;
    width:80%;
    border-radius: 10px;
    border:none;
    background-color:#262827;
    outline: none;
    color:#f4f4f4;
    font-size:18px;
}
#myShare .addShare div input{
    padding-left: 10px;
    height:40px;
}
#myShare .addShare div textarea{
    height:300px;    
    padding: 10px;

}
#myShare .addShare button{
    display: block;
    width:80px;
    height:40px;
    border:none;
    background-color:#262827;
    border-radius: 10px;
    color:#f4f4f4;
    margin:20px auto;
    cursor: pointer;
    outline: none;
    font-size: 18px;
}
</style>


