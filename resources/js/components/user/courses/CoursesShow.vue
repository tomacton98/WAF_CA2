<template>
    <div class="card card-default">
        <div class="card-header">Courses details</div>

        <div class="card-body">
            <form>
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Title</label>
                        <input type="text" v-model="course.title" class="form-control" readonly>
                    </div>
                    <div class="col-md-6 form-group">
                        <label>Code</label>
                        <input type="text" v-model="course.code" class="form-control" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-4 form-group">
                        <label>Description</label>
                        <input type="text" v-model="course.description" class="form-control" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label>Points</label>
                        <input type="text" v-model="course.points" class="form-control" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label>Level</label>
                        <input type="text" v-model="course.level" class="form-control" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <router-link :to="{ name: 'courses' }" class="btn btn-secondary">Back</router-link>
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
            axios.get('/api/courses/' + id, { headers: { "Authorization": "Bearer " + token }})
                .then(function (resp) {
                    console.log(resp.data);
                    app.course = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert('Could not load course');
                });
        },
        data: function () {
            return {
                course: {
                    title: '',
                    code: '',
                    description: '',
                    points: '',
                    level: '',
                },
                errors: {}
            }
        }
    }
</script>
