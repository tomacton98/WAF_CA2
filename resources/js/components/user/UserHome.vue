<template>
    <div>
        <!-- The sidebar -->
        <div class="sidebar">
            <router-link :to="{ name: 'courses' }" active-class="active">Courses</router-link>
            <router-link :to="{ name: 'students' }" active-class="active">Students</router-link>
            <router-link :to="{ name: 'enrolments' }" active-class="active">Enrolments</router-link>
            <button v-on:click="logout()" class="btn btn-primary m-3">Logout</button>
        </div>

        <!-- Page content -->
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
            }
        },
        mounted() {
            var app = this;
            if (localStorage.getItem('token') === null) {
                app.$router.replace({name: 'login'});
            }
        },
        methods: {
            logout() {
              var app = this;
              var token = localStorage.removeItem('token');
              app.$router.push({ name: 'login' });
            }
        }
    }
</script>
