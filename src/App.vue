<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
const router = useRouter()
const store = useStore();

onMounted(()=>{
  if(store.state.adminAuth.access_token == null){
    router.push({path:'/'})
  }
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
