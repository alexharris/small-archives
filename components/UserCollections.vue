<template>
    <div>
        <div v-for="collection in collections" class="border rounded p-4 my-2"> 
            <h2 class="text-lg">{{collection}}</h2>
            <div class="flex flex-row">
            <nuxt-link class="pr-4" :to="'/' + username + '/' + collection">View</nuxt-link><br />
            <nuxt-link :to="'/admin/' + username + '/' + collection">Edit</nuxt-link><br />
            </div>
        </div>
        <form class="">
            <input class="border border-blue-600" type="text" v-model="newCollectionId">
            <button  class="px-2 text-white bg-blue-600 rounded" type="button" @click="addCollection">
                New Collection
            </button>  
        </form>          
    </div>
</template>
<script>
    import firebase from 'firebase' 

    export default {
        components: {
            
        },
        data: function() {
            return {
                newCollectionId: '',
                collections: [],
                userEmail: '',
                username: this.$route.params.username,

            }
        },
        computed: {
                
        },
        created() {
            this.getEmailFromUsername()
        },
        methods: {         
            getCollections() {
                this.collections = []
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        this.collections.push(doc.id)
                    });
                });
            },  
            getEmailFromUsername() {
                firebase.firestore().collection('users').where("username", "==", this.username)      
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        this.userEmail = doc.id
                        this.getCollections()
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });                
            },    
            addCollection() {
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.newCollectionId).set({
                }).then(() => {
                    this.newItemId = ''
                    this.getCollections()
                })
            }       
     
        }
    }
    </script>