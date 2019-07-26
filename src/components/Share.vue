<template>
  <div id="share">
    <div class="header" @mouseleave="hideList">
      <div class="shareImg" @click="showList"></div>
      <ul v-show="listShow">
        <li active>SHARE广场</li>
        <li>我的SHARE</li>
        <li>个人中心</li>
        <li @click="signOut">注销</li>
        <span></span>
      </ul>
    </div>
    <div class="content"></div>
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
          window.location.href = "/"
      }
  }
};
console.log(manageCookie);
</script>

<style scoped>
#share * {
  box-sizing: border-box;
  list-style: none;
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
</style>