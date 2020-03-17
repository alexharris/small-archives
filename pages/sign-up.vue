<template>
<div class="border p-4">
    Sign Up
    <form class="card-body">
        <!-- Username -->
        <div class="form-group row justify-content-center">
        
        <div class="col-sm-10">
            <label for="inputUsername">Username</label>
            <input class="form-control" id="inputUsername" placeholder="Username" v-model="username">
        </div>
        </div>        
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
            <div class="btn btn-dark " @click="userSignedUp">Sign Up</div>
        </div>
        </div>
        
    </form>
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
          password: '',
          username: ''
      }
  },
  methods: {  
    userSignedUp() {
        console.log('userSignedUp')
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            }).then((user) => {
                // Create a new user and initial collection in firestore
                firebase.firestore().collection('users').doc(user.user.email).collection('Collections').doc('First Collection').set({

                })
                .then(() => {
                    console.log("Document successfully written!");
                    firebase.firestore().collection('users').doc(user.user.email).set({
                        username: this.username
                    }).then(() => {
                        this.$router.replace('admin') 
                    })
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });       
                
                
            })
    }    
  },
}
</script>