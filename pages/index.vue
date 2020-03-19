<template>
  <div class="flex flex-col container mx-auto">
    <div>
      <h1 class="text-2xl">Small Archives</h1>
    </div>
    <div>
      <div class="hover:bg-blue-800 inline-block p-2 rounded bg-white border border-blue-800 hover:text-white cursor-pointer" @click="toggleForms()">Sign In</div>
      <div class="hover:bg-blue-800 inline-block p-2 rounded bg-white border border-blue-800 hover:text-white cursor-pointer" @click="toggleForms()">Sign Up</div>

    </div>
    <div class="flex flex-row mt-8">
      <div class="w-1/2">
    <SignIn v-if="showSignIn" />
      </div>
    </div>
    <SignUp v-if="!showSignIn" />
  </div>
</template>

<script>
import SignIn from '~/components/SignIn.vue'
import SignUp from '~/components/SignUp.vue'
import firebase from 'firebase' 

export default {
  components: {
    SignIn,
    SignUp
  },
  data() {
    return {
      showSignIn: true
    }
  },
  methods: {
    toggleForms() {
      this.showSignIn = !this.showSignIn
    }
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
