import { createApp } from 'vue'
import App from './App.vue'
import './tool/WkEpg3.2'
//import $ from 'jquery'
import Mock from 'mockjs'
import './tool/Util'
//window.WkEpg.Util.$ = $

window.Mock = Mock
//window.$ = $
createApp(App).mount('#app')
