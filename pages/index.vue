<template>
  <div class="flex flex-col container mx-auto  pt-4">
    <div>
      <h1 class="text-2xl">Small Archives</h1>
      <p class="py-4 text-xl">Small Archives is a tool for creating collections out of Internet Archive data. You just need to enter a list of Internet Archive item IDs, and Small Archives will provide a page for that collection:</p>
      <div class="flex flex-col md:flex-row items-center">
        <img src="~/assets/birds-admin.png">
        <span class="text-4xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="invisible md:visible" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c5282" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="md:invisible visible" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c5282" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg>
        </span>
        <img src="~/assets/birds-collection.png">
      </div>
    </div>
    <div class="w-full md:w-1/2 mx-auto pt-8">
      <div>
        <div v-bind:class="{ 'bg-gray-400': !showSignIn }" class="hover:bg-blue-800 inline-block p-2 bg-white border border-b-0 border-blue-800 hover:text-white cursor-pointer" @click="toggleForms()">Sign In</div>
        <div v-bind:class="{ 'bg-gray-400': showSignIn }" class="hover:bg-blue-800 inline-block p-2 bg-white border border-b-0 border-blue-800 hover:text-white cursor-pointer" @click="toggleForms()">Sign Up</div>
      </div>
      <div class="border border-blue-800 p-4">
        <SignIn v-if="showSignIn" />
        <SignUp v-if="!showSignIn" />
      </div>
    </div>
    <p class="pt-8 text-center">Small Archives is created by <a href="http://twitter.com/alexharris6">@alexharris6</a></p>
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
