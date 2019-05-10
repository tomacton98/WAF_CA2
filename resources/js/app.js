
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import LoginForm from './components/auth/LoginForm.vue';
import UserHome  from './components/user/UserHome.vue';

import CoursesIndex  from './components/user/courses/CoursesIndex.vue';
import CoursesShow   from './components/user/courses/CoursesShow.vue';

import StudentsIndex  from './components/user/students/StudentsIndex.vue';
import StudentsShow   from './components/user/students/StudentsShow.vue';

import EnrolmentsIndex  from './components/user/enrolments/EnrolmentsIndex.vue';
import EnrolmentsShow   from './components/user/enrolments/EnrolmentsShow.vue';

import CreateEnrolment  from './components/user/enrolments/EnrolmentsCreate.vue';
import EditEnrolment    from './components/user/enrolments/EnrolmentsEdit.vue';

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const routes = [
    {
        path: '/',
        name: 'loginForm',
        components: {
            loginForm: LoginForm
        }
    },
    {
        path: '/home',
        component: UserHome,
        name: 'home',
        children: [
          {
              path: 'courses',
              name: 'courses',
              component: CoursesIndex
          },
          {
              path: 'courses/:id',
              name: 'courses.show',
              component: CoursesShow
          },
          {
              path: 'students',
              name: 'students',
              component: StudentsIndex
          },
          {
              path: 'students/:id',
              name: 'students.show',
              component: StudentsShow
          },
          {
              path: 'enrolments',
              name: 'enrolments',
              component: EnrolmentsIndex
          },
          {
              path: 'enrolments/:id',
              name: 'enrolments.show',
              component: EnrolmentsShow
          },
          {
              path: 'enrolments/create',
              name: 'enrolments.create',
              component: CreateEnrolment
          },
          {
              path: 'enrolments/:id/edit',
              component: EditEnrolment,
              name: 'enrolments.show',
          },
        ]
      },
  ];

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 const router = new VueRouter({
     routes: routes
 });

const app = new Vue({
    el: '#app',
    router: router
});
