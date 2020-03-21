<template>
    <div>
        <h1 class="text-2xl pb-4">Sign In</h1>
        <FormError v-if="error">
            {{error}}
        </FormError>
        <form class="card-body ">       
            <!-- Email -->
            <div class="form-group row justify-content-center">
            
            <div class="my-2">
                <label for="inputEmail">Email</label><br />
                <input type="email" class="form-control border border-blue-800 p-2 w-full" id="inputEmail" placeholder="Email" v-model="email">
            </div>
            </div>
            <!-- Password -->
            <div class="form-group row justify-content-center">
            
            <div class="my-2">
                <label for="inputPassword">Password</label><br />
                <input type="password" class="form-control border border-blue-800 p-2 w-full" id="inputPassword" placeholder="Password" v-model="password">
            </div>
            </div>                 

            <div class="hover:bg-blue-800 inline-block p-2 rounded bg-white border border-blue-800 hover:text-white cursor-pointer" @click="userSignedIn()">Sign In</div>
        </form>
   
    </div>
</template>
<script>
import firebase from 'firebase' 
import FormError from '~/components/FormError' 

export default {
  components: {
    FormError
  },
  data() {
      return {
          email: '',
          password: '',
          error: ''
      }
  },
  methods: {  
    userSignedIn() {
        this.error = ''
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    this.error = 'Wrong password.';
                } else {
                    this.error = errorMessage;
                }
        }).then((user) => {
            if(!this.error) {
                firebase.firestore().collection('users').doc(this.email).get().then((doc) => {
                    this.$router.replace('admin/' + doc.data().username) 
                });
            }

            
        })  
    }    
  }
}
</script>