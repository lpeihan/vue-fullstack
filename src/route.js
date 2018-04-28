import Vue from 'vue';
import Router from 'vue-router';
import hello from './components/hello';
import records from './pages/records/records';
import login from './pages/user/login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'records',
      component: records
    },
    {
      path: '/hello',
      name: 'hello',
      component: hello
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
});
