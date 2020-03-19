

<template>
    <div v-if="signedInUser.email == userFromUrl">
        <div class="flex flex-row w-full border-b mb-8 border-blue-800 justify-between py-4">
            <nuxt-link :to="'/admin/' + username">Dashboard</nuxt-link>
            <SignOut />
        </div>

        <nuxt-child/>
        
        
    </div>
    <div v-else>
        Not available!
    </div>
    
</template>
<script>
    import firebase from 'firebase' 
    import CurrentUser from '~/components/CurrentUser.vue'
    import UserCollections from '~/components/UserCollections.vue'
    import SignOut from '~/components/SignOut.vue'



    export default {
        components: {
            CurrentUser,
            UserCollections,
            SignOut
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