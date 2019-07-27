<template>
    <div id="myShare">
        <div class="contentBox">
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
        <div class="add">
            <router-link to="/addShare" class="link">
                <span class="first"></span><span></span>
            </router-link>
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
            shareCon: [],
            id: '',
        }
    },
    created() {
        var self = this;
        manageCookie.getCookie("id",function (getId) {
            // console.log("id" + getId);
            self.id = getId;
        })
        this.$http.get("https://user-34638.firebaseio.com/post/"+ this.id + ".json")
                .then(function (data) {
                    return data.body
                })
                .then(function (data) {
                    var Arr = [];
                    for(let key in data){
                        // console.log(key.slice(0,1))
                        if(key.slice(0,1) == '-'){
                            Arr.push(data[key]);
                        }
                    }
                    this.shareCon = Arr;
                })
    }
}
</script>

<style scoped>
    #myShare *{
        box-sizing: border-box;
    }
    #myShare .contentBox{
        /* display: flex; */
        width:90%;
        /* border:1px solid red; */
        margin: 0 auto;
    }
    #myShare .contentBox .shareCon{
        display: inline-block;
        width:21%;
        height:300px;
        flex:1;
        overflow: hidden;
        padding:20px 30px;
        vertical-align: top;
    }
    #myShare .add{
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color:#5b5a5a;
    }
    #myShare .add .link{
        display: inline-block;
        width:100%;
        height: 100%;
    }
    #myShare .add .link span{
        position: absolute;
        top:50%;
        left:50%;
        margin-left:-15px;
        transform: translate(0,-50%);
        width:60%;
        height: 4px;
        background-color:#ccc;
        border-radius:2px;
        z-index: 999;
    }
    #myShare .add .link span.first{
        transform: rotatez(90deg);
    }
</style>


