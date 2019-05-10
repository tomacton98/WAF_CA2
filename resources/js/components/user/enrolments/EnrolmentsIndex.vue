<template>
    <div class="card card-default">
        <div class="card-header">Enrolments list</div>

        <div class="card-body">
          <router-link :to="{ name: 'enrolments.create' }" class="btn btn-success">
              Create new Enrolment
          </router-link>
            <p v-if="enrolments.length == 0">There are no enrolments</p>
            <table v-if="enrolments.length != 0" class="table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="enrolment in enrolments">
                        <td>{{ enrolment.student.name }}</td>
                        <td>{{ enrolment.course.title }}</td>
                        <td>{{ enrolment.date }}</td>
                        <td>{{ enrolment.time }}</td>
                        <td>{{ enrolment.status }}</td>
                        <td>
                            <router-link :to="{ name: 'enrolments.show', params: { id: enrolment.id } }" class="btn btn-info">
                                View
                            </router-link>
                            <router-link :to="{ name: 'enrolments.edit', params: { id: enrolment.id } }" class="btn btn-warning">
                                Edit
                            </router-link>
                            <button v-on:click="deleteEnrolment(enrolment.id)" class="btn btn-danger">Delete</button>
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
            axios.get('/api/enrolments', { headers: { "Authorization": "Bearer " + token }})
                .then(function (resp) {
                    console.log(resp.data);
                    app.enrolments = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert('Could not load enrolments');
                });
        },
        data() {
            return {
                enrolments: []
            }
        },
        methods: {
            deleteEnrolment(id) {
                if(confirm("Are you sure you want to do this?")) {
                    var app = this;
                    var token = localStorage.getItem('token');
                    axios.delete('/api/enrolments/' + id, { headers: { "Authorization": "Bearer " + token }})
                        .then(function (resp) {
                            var index = app.enrolments.findIndex(d => d.id === id);
                            app.enrolments.splice(index, 1);
                        })
                        .catch(function (resp) {
                            console.log(resp);
                            alert('Could not delete enrolment');
                        });
                }
            }
        }
    }
</script>
