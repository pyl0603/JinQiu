<template>
  <div class="container">
    <div>
      <!-- <Logo /> -->
      <h1 class="title">
        <input type="text" v-model="account">
        <input type="text" v-model="pwd">
        hello world1222
      </h1>
      <button @click="sub">登录</button>
      1212122
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data(){
    return{
      account:'',
      pwd:''
    }
  },
  created(){
    this.$message.info('iii')
  },
  methods:{
    sub(){
      login({name:this.account,password:this.pwd}).then()
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
