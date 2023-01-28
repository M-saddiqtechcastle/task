<template>
    <KeepAlive>
        <component :is="activeComponent" @changeStepNum="ChangStep" />
    </KeepAlive>
</template>

<script>
import SignUp from './SignUp.vue'
import Login from './Login.vue'
export default {
    name: 'MaiN',
    components: {
        SignUp,
        Login
    },
    data() {
        return {
            activeComponent: 'Login',
        }
    },
    methods: {
        ChangStep(event) {
            this.activeComponent = event.component
        }
    },
}
</script>

<style>

</style>