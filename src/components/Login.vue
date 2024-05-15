<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Send login request and handle authentication token
      // Store token in local storage
    }
  }
}
</script>

<template>
  <div>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>
