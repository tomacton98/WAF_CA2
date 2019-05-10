<template>
    <div class="card card-default">
        <div class="card-header">Student list</div>

        <div class="card-body">
            <p v-if="students.length == 0">There are no students</p>
            <table v-if="students.length != 0" class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students">
                        <td>{{ student.name }}</td>
                        <td>{{ student.address }}</td>
                        <td>{{ student.email }}</td>
                        <td>{{ student.phone }}</td>
                        <td>
                            <router-link :to="{ name: 'students.show', params: { id: student.id } }" class="btn btn-info">
                                View
                            </router-link>
                            <router-link :to="{ name: 'students.edit', params: { id: student.id } }" class="btn btn-warning">
                                Edit
                            </router-link>
                            <button v-on:click="deleteStudent(student.id)" class="btn btn-danger">Delete</button>
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
            axios.get('/api/students', { headers: { "Authorization": "Bearer " + token }})
                .then(function (resp) {
                    console.log(resp.data);
                    app.students = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert('Could not load students');
                });
        },
        data() {
            return {
                students: []
            }
        },
        methods: {
            deleteStudent(id) {
                if(confirm("Are you sure you want to do this?")) {
                    var app = this;
                    var token = localStorage.getItem('token');
                    axios.delete('/api/students/' + id, { headers: { "Authorization": "Bearer " + token }})
                        .then(function (resp) {
                            var index = app.students.findIndex(d => d.id === id);
                            app.students.splice(index, 1);
                        })
                        .catch(function (resp) {
                            console.log(resp);
                            alert('Could not delete student');
                        });
                }
            }
        }
    }
</script>
