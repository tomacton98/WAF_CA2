<template>
    <div class="card card-default">
        <div class="card-header">Student details</div>

        <div class="card-body">
            <form>
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Name</label>
                        <input type="text" v-model="student.name" class="form-control" readonly>
                    </div>
                    <div class="col-md-6 form-group">
                        <label>Address</label>
                        <input type="text" v-model="student.address" class="form-control" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-4 form-group">
                        <label>Email</label>
                        <input type="text" v-model="student.email" class="form-control" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label>Phone</label>
                        <input type="text" v-model="student.phone" class="form-control" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <router-link :to="{ name: 'students' }" class="btn btn-secondary">Back</router-link>
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
            axios.get('/api/students/' + id, { headers: { "Authorization": "Bearer " + token }})
                .then(function (resp) {
                    console.log(resp.data);
                    app.student = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert('Could not load student');
                });
        },
        data: function () {
            return {
                student: {
                    name: '',
                    address: '',
                    emmail: '',
                    phone: '',
                },
                errors: {}
            }
        }
    }
</script>
