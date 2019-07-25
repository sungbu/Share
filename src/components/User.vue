<template>
  <div id="user">
    <div class="userBox">
      <form>
        <div class="userImg"></div>
        <div class="userdes">
          <div class="username">
            <label for>User Name:</label>
            <input type="text" />
          </div>
          <div class="pas">
            <label for>Passsword:</label>
            <input type="password" />
          </div>
          <button class="sign">SIGN IN</button>
          <button class="logon">LOGON</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {};
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
  padding:50px;
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
#user .userBox .userdes label{
    display: inline-block;
    width:170px;
    /* text-align:right; */
    padding-right:5px;
    color:#a6a2a2;
    font-size:25px;
    font-weight: bolder;
}
#user .userBox .userdes label+input{
    width: 300px;
    height:30px;
    background-color:#a6a2a2;
    border:none;
    border-radius:5px;
    outline:none;
    text-indent:1rem;
    font-size: 19px;
}
#user .userBox .userdes .username{
    margin:40px 0;
}
#user .userBox button.sign{
    display: block;
    margin:40px auto;
    width:100px;
    height:50px;
    border-radius: 5px;
    border:2px solid #201f1f;
    background-color: #a6a2a2;
    font-size: 19px;
    cursor: pointer;
}
#user .userBox button.logon{
    position: absolute;
    bottom:30px;
    right:40px;
    background:none;
    border:none;
    color:#a6a2a2;
}
#user .userBox button.logon:hover{
    text-decoration: underline;
    cursor: pointer;
}
</style>

