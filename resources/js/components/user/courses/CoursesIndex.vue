<template>
    <div class="card card-default">
        <div class="card-header">Courses list</div>

        <div class="card-body">
            <p v-if="courses.length == 0">There are no courses</p>
            <table v-if="courses.length != 0" class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Points</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in courses">
                        <td>{{ course.title }}</td>
                        <td>{{ course.code }}</td>
                        <td>{{ course.description }}</td>
                        <td>{{ course.points }}</td>
                        <td>{{ course.level }}</td>
                        <td>
                            <router-link :to="{ name: 'courses.show', params: { id: course.id } }" class="btn btn-info">
                                View
                            </router-link>
                            <button v-on:click="deleteCourse(course.id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            var app = this;
            var token = localStorage.getItem('token');
            axios.get('/api/courses', { headers: { "Authorization": "Bearer " + token }})
                .then(function (resp) {
                    console.log(resp.data);
                    app.courses = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert('Could not load courses');
                });
        },
        data() {
            return {
                courses: []
            }
        },
        methods: {
            deleteCourse(id) {
                if(confirm("Are you sure you want to do this?")) {
                    var app = this;
                    var token = localStorage.getItem('token');
                    axios.delete('/api/courses/' + id, { headers: { "Authorization": "Bearer " + token }})
                        .then(function (resp) {
                            var index = app.courses.findIndex(d => d.id === id);
                            app.courses.splice(index, 1);
                        })
                        .catch(function (resp) {
                            console.log(resp);
                            alert('Could not delete course');
                        });
                }
            }
        }
    }
</script>
