<template>
  <div>
    <SignIn />
  </div>
</template>

<script>
import SignIn from '~/components/SignIn.vue'
import firebase from 'firebase' 

export default {
  components: {
    SignIn,  },
  methods: {
  },
  created() {

  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

</style>
