<template>
  <Toast />
  <section class="vh-100" style="background-color: #eee;">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  <form class="mx-1 mx-md-4">

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">Your Email</label>
                        <input type="email" v-model="formdata.email" class="form-control" />

                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4c">Password</label>
                        <input type="password" v-model="formdata.password" id="form3Example4c" class="form-control" />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                        <input type="password" v-model="formdata.password_confirmation" id="form3Example4cd"
                          class="form-control" />

                      </div>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" class="btn btn-primary btn-lg" @click="register()">Register</button>
                    </div>

                  </form>

                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid" alt="Sample image">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineEmits } from 'vue'
import Toast from 'primevue/toast';
// import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from "primevue/usetoast";
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
const emit = defineEmits(["changeStepNum"]);
const toast = useToast();
// const router = useRouter()
const formdata = reactive({
  email: '',
  password: '',
  password_confirmation: ''
})

const register = async () => {
  let data = {
    email: formdata.email,
    password: formdata.password,
    password_confirmation: formdata.password_confirmation
  }
  console.log(Object.entries(data))
  let fd = new FormData;
  for (const [key, value] of Object.entries(data)) {
    fd.append(key, value)
  }
  axios.post('http://3.232.244.22/api/register', fd)
    .then(response => {
      localStorage.setItem('user_info', JSON.stringify(data))
      toast.add({ severity: 'success', summary: 'Success Message', detail: response.data.message, life: 3000 });
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'kindly check your email', life: 3000 });
      emit("changeStepNum", { component: "login" });
    })
    .catch(error => {
      toast.add({ severity: 'success', summary: 'Success Message', detail: error.response.data.error, life: 13000 });
    })
};

onMounted(() => {
  // let users = localStorage.getItem('user_info')
  // if(users){
  //   router.push({path:'/ToDoList'})
  // }
})
</script>

<style scoped>

</style>