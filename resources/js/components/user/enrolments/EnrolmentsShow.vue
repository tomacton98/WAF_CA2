<template>
    <div class="card card-default">
        <div class="card-header">Enrolment details</div>

        <div class="card-body">
            <form>
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Student</label>
                        <input type="text" v-model="enrolment.student.name" class="form-control" readonly>
                    </div>
                    <div class="col-md-6 form-group">
                        <label>Course</label>
                        <input type="text" v-model="enrolment.course.title" class="form-control" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-4 form-group">
                        <label>Date</label>
                        <input type="text" v-model="enrolment.date" class="form-control" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label>Time</label>
                        <input type="text" v-model="enrolment.time" class="form-control" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label>Status</label>
                        <input type="text" v-model="enrolment.status" class="form-control" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <router-link :to="{ name: 'enrolments' }" class="btn btn-secondary">Back</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            var app = this;
            var id = app.$router.currentRoute.params.id;
            var token = localStorage.getItem('token');
            axios.get('/api/enrolments/' + id, { headers: { "Authorization": "Bearer " + token }})
                .then(function (resp) {
                    console.log(resp.data);
                    app.enrolment = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert('Could not load enrolment');
                });
        },
        data: function () {
            return {
                enrolment: {
                    date: '',
                    time: '',
                    status: '',
                    course_id: '',
                    student_id: '',
                },
                errors: {}
            }
        }
    }
</script>
