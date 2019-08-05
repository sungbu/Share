<template>
  <div id="user">
    <div class="bgPic">
      <div>
        <p>SHARE
          <span :class="this.yTop"></span>
        </p>
        <p>SHARE</p>
      </div>
      <div>
        <p>SHARE
          <span :class="this.yTop"></span>
        </p>
        <p>SHARE</p>
      </div>
      <div>
        <p>SHARE
          <span :class="this.yTop"></span>
        </p>
        <p>SHARE</p>
      </div>
      <div>
        <p>SHARE
          <span :class="this.yTop"></span>
        </p>
        <p>SHARE</p>
      </div>
      <div>
        <p>SHARE
          <span :class="this.yTop"></span>
        </p>
        <p>SHARE</p>
      </div>
    </div>
    <div class="userBox">
      <div :class="'bar ' + this.yTop"></div>
      <form>
        <div class="warnning">
          <span v-show="showWarnning" v-model="warnning">{{warnning}}</span>
        </div>
        <div class="userImg">
          <div>
            <span></span><span></span>
          </div>
          <div>
            <div><img src="http://pic.yupoo.com/prince450/bbe84274/b23759fb.jpg" alt=""></div>
            <span :class="eye"></span>
          </div>
        </div>
        <div class="userdes">
          <div class="username" @mouseover="eyesM(true)" @mouseleave="eyesC">
            <label for>User Name:</label>
            <input type="text" v-model="users.userName" />
          </div>
          <div class="pas" @mouseover="eyesM(false)" @mouseleave="eyesC">
            <label for>Passsword:</label>
            <input type="password" v-model="users.password" />
          </div>
          <button class="sign" v-model="maxBtn" @click="oSubmit">{{maxBtn}}</button>
          <button class="logon" v-model="minBtn" @click="logon">{{minBtn}}</button>
        </div>
      </form>
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
  name: "user",
  data() {
    return {
      ifLogon: false,
      maxBtn: "SIGN IN",
      minBtn: "SIGN OUT",
      btnName: "",
      users: {
        userName: "",
        password: ""
      },
      warnning: "",
      showWarnning: false,
      eye: "",
      yTop: "0"
    };
  },
  methods: {
    logon(e) {
      e.preventDefault();
      this.btnName = this.maxBtn;
      this.maxBtn = this.minBtn;
      this.minBtn = this.btnName;
      this.ifLogon = !this.ifLogon;
      console.log(this.ifLogon);
    },
    oSubmit(e) {
      e.preventDefault();
      this.shareTop(1);
      if (this.ifLogon) {
        this.$http
          .post("https://user-34638.firebaseio.com/post.json", this.users)
          .then(function(data) {
            console.log("用户注册成功");
            console.log(data);
          });
      } else {
        this.$http
          .get("https://user-34638.firebaseio.com/post.json")
          .then(function(data) {
            this.shareTop(2);
            console.log(data.body);
            return data.body;
          })
          .then(function(data) {
            for (let key in data) {
              if (data[key].userName == this.users.userName) {
                console.log("用户名存在");
                this.showWarnning = false;
                if (data[key].password == this.users.password) {
                  this.shareTop(3);
                  console.log("密码正确");
                  manageCookie.setCookie("username",this.users.userName,50000)
                  .setCookie("id",key);
                  this.shareTop(4);
                  setTimeout(function(){
                    window.location.href = window.location.href + "share";
                  },500)
                } else {
                  console.log("密码错误");
                  this.warnning = "密码错误";
                  this.showWarnning = true;
                  this.shareTop(0);
                }
                return;
              }
            }
            console.log("未注册");
            this.warnning = "未注册";
            this.shareTop(0);
            this.showWarnning = true;
          })
      }
    },
    eyesM(eye) {
      if(eye){
        this.eye = "active1"
      }else{
        this.eye = "active2"
      }
    },
    eyesC() {
      this.eye = "";
    },
    shareTop(top) {
      console.log(this.yTop)
      this.yTop = top + '';
    }
  },
  created() {
    const self = this;
    manageCookie.getCookie("username",function (name) {
      self.users.userName = name
    })
    
  },
};
</script>


<style scoped>
#user * {
  box-sizing: border-box;
}div::-webkit-scrollbar {
  width: 0;
}
#user {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color:#3c3c3c
}
#user .bgPic{
  position: relative;
  width:100%;
  height:100%;
  /* border:1px solid red; */
  overflow: hidden;
}
#user .bgPic div{
  position: absolute;
}
#user .bgPic div:nth-child(1){

}
#user .bgPic div:nth-child(2){
  right:290px;
  top:20px;
}
#user .bgPic div:nth-child(3){
  top:calc(50% - 100px);
  left:-100px;
}
#user .bgPic div:nth-child(4){
  top:calc(50% - 100px);
  right: 200px;
}
#user .bgPic div:nth-child(5){
  bottom: 200px;
  right:calc(50% + 250px);
}
#user .bgPic div p{
  position: absolute;
  width:600px;
  height:250px;
  /* border:1px solid black; */
  font-size:160px;
  line-height: 200px;
  font-weight: 600;
  /* border:1px solid red; */
  overflow: hidden;
}
#user .bgPic div p span{
  position:absolute;
  left: 0;
  top:0;
  width:100%;
  height:100%;
  background-color: #3c3c3c;
  z-index: -1;
  /* border:1px solid red; */
  transition:all 1s ease;
}
#user .bgPic div p span[class = "0"]{
  top:0;
}
#user .bgPic div p span[class = "1"]{
  top:-120px;
}
#user .bgPic div p span[class = "2"]{
  top:-160px;
}
#user .bgPic div p span[class = "3"]{
  top:-200px;
}
#user .bgPic div p span[class = "4"]{
  top:-250px;
}
#user .bgPic div p:nth-child(1){
  position: absolute;
  -webkit-text-stroke:1px #f4f4f4;
  color:transparent;
  z-index:99;
}
#user .bgPic div p:nth-child(2){
  color:#f4f4f4;
}
#user .userBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 500px;
  background:rgba(32, 31, 31, .9);
  border-radius: 5px;
  text-align: center;
  padding: 40px;
  z-index:999;
}
#user .userBox .bar{
  position:absolute;
  top:0;
  left:0;
  width:0;
  height:5px;
  border-radius: 10px;
  background-color:#7e7e7e;
  transition: all .5s ease;
}
#user .userBox .bar[class = "bar 0"]{
  width:0;
}
#user .userBox .bar[class = "bar 1"]{
  width:25%;
}
#user .userBox .bar[class = "bar 2"]{
  width:50%;
}
#user .userBox .bar[class = "bar 3"]{
  width:75%;
}
#user .userBox .bar[class = "bar 4"]{
  width:100%;
}
#user .userBox .warnning {
  height: 40px;
  margin-bottom: 30px;
}
#user .userBox .warnning span {
  display: inline-block;
  border: 1px solid crimson;
  color: crimson;
  width: 100%;
  height: 100%;
  line-height: 40px;
  font-weight: bolder;
  font-size: 19px;
}
#user .userBox .userImg {
  position: relative;
  height:100px;
}
#user .userBox .userImg>div:nth-child(1){
  position: absolute;
  width:110px;
  height:110px;
  /* border:1px solid red; */
  left:50%;
  margin-left:-55px;
  margin-top:-5px;
  background-color:#3c3c3c;
  border-radius: 10px;
}
#user .userBox .userImg>div:nth-child(1)>span{
  position: absolute;
  width:30px;
  height:5px;
  background-color:#3c3c3c;
  border-radius: 10px;
  top:-5\3px;
  z-index:-1;
  margin-left:-13px;
}
#user .userBox .userImg>div:nth-child(1)>span:nth-child(1){
  transform: rotate(45deg);
}
#user .userBox .userImg>div:nth-child(1)>span:nth-child(2){
  transform: rotate(-45deg);
}
#user .userBox .userImg div:nth-child(2){
  position: absolute;
  width:100px;
  height:100px;
  border-radius: 50%;
  /* border:1px solid red; */
  overflow: hidden;
  left:50%;
  margin-left:-50px;
}
#user .userBox .userImg div:nth-child(2) div img{
  width:100px;
}
#user .userBox .userImg div:nth-child(2) span{
  position: absolute;
  left:0;
  top:0;
  display: block;
  width:100px;
  height:0px;
  background-color:#5d5b5b;
  transition: all 1s ease;
}
#user .userBox .userImg div:nth-child(2) span.active1{
  height:30px;
}
#user .userBox .userImg div:nth-child(2) span.active2{
  height:60px;
}
#user .userBox .userdes {
}
#user .userBox .userdes label {
  display: inline-block;
  width: 170px;
  /* text-align:right; */
  padding-right: 5px;
  color: #a6a2a2;
  font-size: 25px;
  font-weight: bolder;
}
#user .userBox .userdes label + input {
  width: 300px;
  height: 30px;
  background-color: #a6a2a2;
  border: none;
  border-radius: 5px;
  outline: none;
  text-indent: 1rem;
  font-size: 19px;
}
#user .userBox .userdes .username {
  margin: 30px 0;
}
#user .userBox button.sign {
  display: block;
  margin: 30px auto;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: 2px solid #201f1f;
  background-color: #a6a2a2;
  font-size: 19px;
  cursor: pointer;
  outline: none;
}
#user .userBox button.logon {
  position: absolute;
  bottom: 30px;
  right: 40px;
  background: none;
  border: none;
  color: #a6a2a2;
  outline: none;
}
#user .userBox button.logon:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>