<template>
  <div class="flex flex-col container mx-auto  py-4">
    <div>
      <h1 class="text-2xl">Small Archives</h1>
      <p class="py-8 text-xl">Small Archives is a tool for creating collections out of Internet Archive data. Just enter a list of Internet Archive item IDs to create a collection page.</p>
      <div class="flex flex-col md:flex-row items-center border-b-2 border-blue-800 pb-8 mb-8">
        <img src="~/assets/birds-admin.png">
        <span class="text-4xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="invisible md:visible" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c5282" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="md:invisible visible" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c5282" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg>
        </span>
        <img src="~/assets/birds-collection.png">
      </div>
    </div>
    <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/2 md:order-2 p-4">
      <div class="bg-blue-100 rounded p-4">
        <h3 class="text-xl font-bold border-b border-blue-800 pb-2 mb-4">Demo</h3>
        <p class="pb-4">To test out Small Archives, sign in to the Demo project:</p>
        <p><strong>Email:</strong> smallarchives@gmail.com</p>
        <p class="pb-4"><strong>Password:</strong> demo!@@</p>
        <p>Or view the <a class="underline hover:no-underline cursor-pointer font-bold" href="/demo/demo">demo collection</a>.</p>
      </div>
    </div>
    <div class="w-full md:w-1/2 md:order-1">
      <div>
        <div v-bind:class="{ 'bg-gray-400': !showSignIn }" class="hover:bg-blue-800 inline-block p-2 bg-white border border-b-0 border-blue-800 hover:text-white cursor-pointer" @click="toggleForms()">Sign In</div>
        <div v-bind:class="{ 'bg-gray-400': showSignIn }" class="hover:bg-blue-800 inline-block p-2 bg-white border border-b-0 border-blue-800 hover:text-white cursor-pointer" @click="toggleForms()">Sign Up</div>
      </div>
      <div class="border border-blue-800 p-4 ">
        <SignIn v-if="showSignIn" />
        <SignUp v-if="!showSignIn" />
      </div>
    </div>
    </div>
    <p class="pt-8 text-center">Small Archives is created by <a class="underline hover:no-underline cursor-pointer" href="http://twitter.com/alexharris6">@alexharris6</a></p>
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
