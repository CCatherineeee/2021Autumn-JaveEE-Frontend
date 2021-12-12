<template>
  <div id="app" style="width:100%;height: 100%;">
    <top-bar></top-bar>
    <!-- <router-view name='index'></router-view> -->
     <router-view></router-view>
     <stack-footer class="stack-footer"></stack-footer>

  </div>
</template>

<script>
import topBar from './components/header/topbar'
import stackFooter from './components/footer/footer'
import suspension from './components/footer/suspension'
export default {
  name: 'app',
  components: {
    suspension,
    topBar,
    stackFooter
  }
}
</script>

<style>
.stack-footer {
  margin-bottom: 76px;
}
.suspension {
  position: fixed;
  left: 0;
  bottom: 0;
  width:100%;
  z-index: 999999999;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width:100%;
  height: 100%;
  margin:0;
  padding: 0;
}
</style>
