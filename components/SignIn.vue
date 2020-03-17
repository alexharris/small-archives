<template>
    <div>
        <FormError v-if="error">
            {{error}}
        </FormError>
        <div class="border p-4">
            Sign In

            <form class="card-body">
                <!-- Email -->
                <div class="form-group row justify-content-center">
                
                <div class="col-sm-10">
                    <label for="inputEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmail" placeholder="Email" v-model="email">
                </div>
                </div>
                <!-- Password -->
                <div class="form-group row justify-content-center">
                
                <div class="col-sm-10">
                    <label for="inputPassword">Password</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="password">
                </div>
                </div>                 
                <div class="row justify-content-center pt-3">
                <div class="col-sm-10">
                    <div class="btn btn-dark " @click="userSignedIn">Sign In</div>
                </div>
                </div>
                
            </form>
        </div>
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