<template>
<div class="hover:bg-blue-800 inline-block p-1 text-sm rounded bg-white border border-blue-800 hover:text-white cursor-pointer">
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