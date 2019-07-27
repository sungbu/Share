<template>
  <div id="addShare">
    <div class="addContent">
      <form>
        <div class="title">
          <label for>标题：</label>
          <input type="text" v-model="shareList.title" />
        </div>
        <div class="des">
          <label for>内容：</label>
          <textarea v-model="shareList.content"></textarea>
        </div>
        <div class="oUrl">
          <label for>附件：</label>
          <input type="text" v-model="shareList.pictrue" />
        </div>
        <button @click="addShare">添加</button>
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
  name: "addShare",
  data() {
    return {
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
    addShare(e) {
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
        this.$http.post("https://share-news-8ac61.firebaseio.com/post.json",obj);
    }
  }
};
</script>

<style scoped>
#addShare * {
  box-sizing: border-box;
  font-size: 18px;
  color: #201f1f;
}
#addShare {
  position: relative;
  height: 100vh;
  text-align: center;
}
#addShare .addContent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 600px;
  /* border: 1px solid red; */
  padding: 40px;
  background-color: #8f8f8f;
  border-radius: 10px;
}
#addShare .addContent div {
  display: flex;
  padding: 20px;
}
#addShare .addContent label {
  flex: 1;
  width: 200px;
  text-align: right;
  padding-right: 10px;
}
#addShare .addContent input,
textarea {
  border: none;
  background-color: #c7c6c6;
  border-radius: 5px;
  flex: 4;
  outline: none;
}
#addShare .addContent input {
  height: 30px;
}
#addShare .addContent textarea {
  height: 300px;
}
#addShare .addContent button {
  display: inline-block;
  width: 90px;
  height: 40px;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: #3c3c3c;
  color: #c7c6c6;
  cursor: pointer;
}
</style>

