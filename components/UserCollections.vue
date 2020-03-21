<template>
    <div>
        <div class="border border-blue-800 rounded mb-6">
            <div v-for="collection in collections" class="border-b last:border-b-0 border-blue-800 p-4"> 
                <h2 class="text-lg font-bold">{{collection.id}}</h2>
                <div class="flex flex-row">
                <nuxt-link class="pr-4" :to="'/' + username + '/' + collection.data.url">View</nuxt-link><br />
                <nuxt-link :to="'/admin/' + username + '/' + collection.data.url">Edit</nuxt-link><br />
                </div>
            </div>
        </div>
        <h4 class="pb-2 text-lg">Add New Collection</h4>
        <form class="">
            <input class="border border-blue-800 p-2 rounded" type="text" v-model="newCollectionId" placeholder="Collection title">
            <button  class="p-2 px-4 text-white bg-blue-800 rounded" type="button" @click="addCollection">
                Add
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
            collectionUrl() {
                var str = this.newCollectionId
                str = str.replace(/\s+/g, '-').toLowerCase();
                return str
            }                
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
                        console.log(doc.id, " => ", doc.data());
                        var collectionData = {"id":doc.id, "data": doc.data()}
                        this.collections.push(collectionData)
                        
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
                    url: this.collectionUrl
                }).then(() => {
                    this.newItemId = ''
                    this.getCollections()
                })
            }       
     
        }
    }
    </script>