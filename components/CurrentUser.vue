

<template>
    <div class="border p-4">
        <div >
            <strong>Current User:</strong> {{user.email}}<br />

        </div>
        <SignOut />
    </div>
</template>
<script>
    import firebase from 'firebase' 
    import SignOut from '~/components/SignOut.vue'


    export default {
        components: {
            SignOut
        },
        data: function() {
            return {
                user: ''
            }
        },
        computed: {          
        },
        created() {

            this.authStateChange()

        },
        methods: {  
            authStateChange() {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        // console.log(user)
                        // User is signed in.
                        this.$store.commit('switchUserStatus')
                        this.user = user
                    } else {
                        // No user is signed in.
                        console.log('no user')
                        this.user = ''
                    }
                });            
            },
        }
    }
</script>