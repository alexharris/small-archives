<template>
    <div class="flex flex-row justify-center">
        <div class="w-1/2">
            <h1 class="text-2xl pb-4">Sign Up</h1>
            <p>Thanks for creating an account. Please note that the username you select will be used in public URLs used to access your collections.</p>
        </div>
        <div class="w-1/2 ml-4 shadow-lg p-4">
        <FormError v-if="error">
            {{error}}
        </FormError>
        <form class="card-body ">
            <!-- Username -->
            <div class="form-group row justify-content-center">
            
            <div class="my-2">
                <label for="inputUsername">Username</label><br />
                <input class="form-control border border-blue-800 p-2 w-full" id="inputUsername" placeholder="Username" v-model="username">
            </div>
            </div>        
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

            <div class="hover:bg-blue-800 inline-block p-2 rounded bg-white border border-blue-800 hover:text-white cursor-pointer" @click="checkUsername()">Sign Up</div>
        </form>
        </div>
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
            this.error = 'That username is not long enough.'
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
    } ,
    checkUsername() {
        firebase.firestore().collection('users').where('username', '==', this.username)
        .get()
            .then((querySnapshot) => {
                console.log(querySnapshot.size)
                if(querySnapshot.size == 1) {
                    this.error = "That username is arleady taken."
                } else {
                    this.userSignedUp()
                }

            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        }       
  },

}
</script>