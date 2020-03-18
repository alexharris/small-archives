<template>
<div class="border p-4">
    <FormError v-if="error">
        {{error}}
    </FormError>
    <h2>Sign Up</h2>
    <form class="card-body">
        <!-- Username -->
        <div class="form-group row justify-content-center">
        
        <div class="m-2">
            <label for="inputUsername">Username</label>
            <input class="form-control border p-2" id="inputUsername" placeholder="Username" v-model="username">
        </div>
        </div>        
        <!-- Email -->
        <div class="form-group row justify-content-center">
        
        <div class="m-2">
            <label for="inputEmail">Email</label>
            <input type="email" class="form-control border p-2" id="inputEmail" placeholder="Email" v-model="email">
        </div>
        </div>
        <!-- Password -->
        <div class="form-group row justify-content-center">
        
        <div class="m-2">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control border p-2" id="inputPassword" placeholder="Password" v-model="password">
        </div>
        </div>                 
        <div class="row justify-content-center pt-3">
        <div class="col-sm-10">
            <div class="btn btn-dark " @click="userSignedUp">Sign Up</div>
        </div>
        </div>
        
    </form>
</div>
</template>
<script>
import firebase from 'firebase' 
import FormError from '~/components/FormError.vue'

export default {
  components: {
    FormError
  },
  data() {
      return {
          email: '',
          password: '',
          username: '',
          error: ''
      }
  },
  methods: {  
    userSignedUp() {
        if(this.username.length < 3) {
            console.log('usrname not long enough')
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        this.error = 'The password is too weak.'
                    } else {
                        this.error = errorMessage
                    }
                    
                }).then((user) => {
                    console.log(user)
                    // Create a new user and initial collection in firestore
                        firebase.firestore().collection('users').doc(user.user.email).collection('Collections').doc('First Collection').set({

                    })
                    .then(() => {
                        console.log("Document successfully written!");
                        firebase.firestore().collection('users').doc(user.user.email).set({
                            username: this.username
                        }).then(() => {
                            this.$router.replace('admin/' + this.username) 
                        })
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });        
            })
        }
    }    
  },
}
</script>