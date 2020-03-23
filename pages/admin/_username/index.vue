

<template>
    <div class="flex flex-col md:flex-row items-start">
   
        <div class="w-full md:w-3/5 md:pr-8">
            <h1 class="text-3xl pt-4  pb-2">Collections</h1>
            <UserCollections />
        </div>
        <div class="rounded my-8 p-4 bg-blue-800 text-white w-full md:w-2/5">
            <h3 class="text-xl pb-2 font-bold">Account Info</h3>
            <strong>Email: </strong>{{signedInUser.email}}<br />
            <strong>Username: </strong>{{username}}</strong>
        </div>          
    </div>
    
</template>
<script>
    import firebase from 'firebase' 
    import UserCollections from '~/components/UserCollections.vue'


    export default {
        components: {
            UserCollections
        },
        data: function() {
            return {
                signedInUser: '',
                userFromUrl: '',
                username: this.$route.params.username
            }
        },
        computed: {

        },
        created() {
            this.authStateChange()
            this.getEmailFromUsername() 
        },
        methods: {  
            authStateChange() {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        // console.log(user)
                        // User is signed in.
                        this.$store.commit('switchUserStatus')
                        this.signedInUser = user
                    } else {
                        // No user is signed in.
                        console.log('no user')
                        this.signedInUser = ''
                    }
                });            
            },
            getEmailFromUsername() {
                if(this.username) {
                    firebase.firestore().collection('users').where("username", "==", this.username)      
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            this.userFromUrl = doc.id

                        });
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });     
                }
            },              
        }
    }
    </script>