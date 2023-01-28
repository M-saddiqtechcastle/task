<template>
  <Toast />
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">

                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Please enter your login and password!</p>

                <div class="form-outline form-white mb-4">
                  <label class="form-label" for="typeEmailX">Email</label>
                  <input type="email" v-model="email" id="typeEmailX" class="form-control form-control-lg" />

                </div>

                <div class="form-outline form-white mb-4">
                  <label class="form-label" for="typePasswordX">Password</label>
                  <input type="password" v-model="password" id="typePasswordX" class="form-control form-control-lg" />
                </div>

                <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>

                <button class="btn btn-outline-light btn-lg px-5" type="submit" @click="logIn()">Login</button>

                <div class="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                  <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                  <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                </div>

              </div>

              <div>
                <p class="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold" @click="signUp()">Sign
                    Up</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios'
import Toast from 'primevue/toast';
import { useRouter } from 'vue-router'
import { useToast } from "primevue/usetoast";
import { ref, defineEmits, onMounted } from 'vue';
const email = ref('')
const password = ref('')
const toast = useToast();
const router = useRouter()
const emit = defineEmits(["changeStepNum"]);
const signUp = () => {
  emit("changeStepNum", { component: "SignUp" });
}

const logIn = async () => {
  await axios.post('http://3.232.244.22/api/login', { email: email.value, password: password.value })

    .then(response => {
      if (response.status == 200) {
        localStorage.setItem('user_token', response.data.user.token)
      }

      toast.add({ severity: 'success', summary: 'Success Message', detail: response.data.message, life: 3000 });
      router.push({ path: '/ToDoList' })
    })
    .catch(error => {
      toast.add({ severity: 'success', summary: 'Success Message', detail: error.response.data.error, life: 13000 });
    })
}

onMounted(() => {
  let users = localStorage.getItem('user_token')
  if (users) {
    router.push({ path: '/ToDoList' })
  }
})
</script>
<script>
export default {
  name: 'LogIn'
}
</script>

<style>

</style>