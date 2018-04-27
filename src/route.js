import Vue from 'vue';
import Router from 'vue-router';
import hello from './components/hello';
import records from './pages/records/records';

Vue.use(Router);

export default new Router({
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
    }
  ]
});
