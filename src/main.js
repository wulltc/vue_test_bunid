import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import RechercheLivre from "./pages/search_result.vue"
import NotFound from "./pages/not_found.vue"
import Landing from "./pages/welcome.vue"
import "./assets/styles/index.css"
import {ROUTES} from "@/util/constant";

const {ROOT,SEARCH} = ROUTES

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {path: ROOT, component: Landing},
    {path: SEARCH, component: RechercheLivre},
    {path: '*', component: NotFound},
  ],
  mode:'history'
});

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
});
