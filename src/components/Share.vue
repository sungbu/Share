<template>
  <div id="share">
    <div class="header" @mouseleave="hideList">
      <div class="shareImg" @click="showList"></div>
      <ul v-show="listShow">
        <li active>SHARE广场</li>
        <li><router-link class="link" to="/MyShare">我的SHARE</router-link></li>
        <li>个人中心</li>
        <li><router-link class="link" to="/">注销</router-link></li>
        <span></span>
      </ul>
    </div>
    <div class="content">
        <div class="shareCon" v-for="share in shareCon">
            <div class="boxTitle">
                <h1>{{share.title}}</h1>
            </div>
            <div class="boxContent">
                <p>{{share.content}}</p>
            </div>
            <img :src="share.pictrue" alt="">
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
  name: "share",
  data() {
    return {
      listShow: false,
      shareCon: []
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
      }
  },
  created() {
      var dataArr = [];
      this.$http.get("https://share-news-8ac61.firebaseio.com/post.json")
                .then(function (data) {
                    return data.body
                })
                .then(function (data) {
                    for(var key in data){
                        dataArr.push(data[key]);
                    }
                    this.shareCon = dataArr;
                })
  }
};
// console.log(manageCookie);
</script>

<style scoped>
#share * {
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
#share .header {
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #201f1f;
}
#share .header .shareImg {
  position: absolute;
  top: 50%;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url("http://pic.yupoo.com/prince450/bbe84274/b23759fb.jpg");
  background-size: 100%;
  transform: translate(0, -50%);
}
#share .header ul {
  position: absolute;
  top: 80px;
  right: 10px;
  background:rgba(171, 169, 169, .5);
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
#share .content{
        /* display: flex; */
        width:90%;
        /* border:1px solid red; */
        margin: 0 auto;
    }
#share .content .shareCon{
    display: inline-block;
    width:21%;
    height:300px;
    flex:1;
    overflow: hidden;
    padding:20px 30px;
    vertical-align: top;
}
</style>