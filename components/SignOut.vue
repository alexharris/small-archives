<template>
<div class="bg-gray-500 cursor-pointer p-1 rounded">
    <div @click="signOut">Sign Out</div>
</div>
</template>
<script>
import firebase from 'firebase' 

export default {
  components: {
    
  },
  data() {
      return {
          email: '',
          password: ''
      }
  },
  methods: {  
    signOut() {
        firebase.auth().signOut()
        this.$store.commit('switchUserStatus')
        this.$router.replace('/') 
    }    
  }
}
</script>