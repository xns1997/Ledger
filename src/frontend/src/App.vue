
<template>
  <!DOCTYPE html>
        <div id="app-container">
          <MainFrame msg="aloha"/>
        </div>
</template>


<script>
import MainFrame from './components/MainFrame.vue'

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import "uikit/dist/css/uikit.min.css"
UIkit.use(Icons);

export default {
  name: 'App',
  components: {
    MainFrame
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#app-container{
  height: 100%;
  min-width: 1200px;
}
html,body{
  width: 100%;
  height: 100%;
}
</style>
