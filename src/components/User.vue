<template>
  <div id="user">
    <div class="userBox">
      <form>
        <div class="warnning">
          <span v-show="showWarnning" v-model="warnning">{{warnning}}</span>
        </div>
        <div class="userImg"></div>
        <div class="userdes">
          <div class="username">
            <label for>User Name:</label>
            <input type="text" v-model="users.userName" />
          </div>
          <div class="pas">
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
      minBtn: "LOGON",
      btnName: "",
      users: {
        userName: "",
        password: ""
      },
      warnning: "",
      showWarnning: false
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
            console.log(data.body);
            return data.body;
          })
          .then(function(data) {
            for (let key in data) {
              if (data[key].userName == this.users.userName) {
                console.log("用户名存在");
                this.showWarnning = false;
                if (data[key].password == this.users.password) {
                  console.log("密码正确");
                  manageCookie.setCookie("username",this.users.userName,50000)
                  .setCookie("id",key);
                  window.location.href = window.location.href + "share";
                } else {
                  console.log("密码错误");
                  this.warnning = "密码错误";
                  this.showWarnning = true;
                }
                return;
              }
            }
            console.log("未注册");
            this.warnning = "未注册";
            this.showWarnning = true;
          });
      }
    }
  },
  created() {
    const self = this;
    manageCookie.getCookie("username",function (name) {
      self.users.userName = name
    })
    
  }
};
</script>


<style scoped>
#user * {
  box-sizing: border-box;
}
#user {
  position: relative;
  width: 100%;
  height: 100vh;
}
#user .userBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 500px;
  background-color: #201f1f;
  border-radius: 5px;
  text-align: center;
  padding: 40px;
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
  width: 50px;
  padding: 50px;
  border: 1px solid #fff;
  border-radius: 50%;
  background: url("http://pic.yupoo.com/prince450/bbe84274/b23759fb.jpg");
  background-size: 100%;
  margin: 0 auto;
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