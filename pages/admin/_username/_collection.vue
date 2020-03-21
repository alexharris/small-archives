<template>
    <div class="flex flex-col md:flex-row items-start">
        
        <div class="w-full md:w-3/4 mr-8">
            <div v-if="editingTitle == false">
                
                <h1 class="text-3xl inline-block">{{collectionTitle}}</h1>
                <!-- <span class="pl-2 cursor-pointer" @click="editingTitle = true">edit title</span> -->
            </div>
                <div v-else>
                    <form class="pt-8">
                        <input class="border border-blue-600"  type="text" v-model="newCollectionTitle">
                        <button class="bg-blue-600 rounded px-2 text-white" type="button" @click="changeCollectionTitle()">
                            Save
                        </button>  
                        <button class="bg-red-600 rounded px-2 text-white" type="button" @click="editingTitle = false">
                            Cancel
                        </button>                  
                    </form>  
                </div>
                <h2 class="py-4 uppercase">Items in collection</h2>
                <ul>
                    <li class="text-xl border-b border-blue-800 p-2 flex flex-row flex-wrap justify-between hover:bg-gray-200 items-center" v-for="item in items">{{item}} <span class="flex flex-row text-red-600 text-sm cursor-pointer border border-red-600 rounded px-1" @click="removeItem(item)">Remove</span></li>
                </ul>
                <div v-if="!items || items.length == 0">
                    <p class="pb-4">Welcome to your new collection. This collection does not currently have any items. Please add an Internet Archive item ID below to get started.</p> 
                    <p class="pb-4">Internet Archive item IDs can be found by getting the last segment of an item's URL:</p>
                    <img class="shadow-lg" src="~/assets/the-id-example.jpg" />

                </div>
                <form class="pt-8">
                    <input class="border border-blue-800 p-2 rounded" placeholder="Item id" type="text" v-model="newItemId">
                    <button class="p-2 px-4 text-white bg-blue-800 rounded" type="button" @click="addItem">
                        Add Item
                    </button>  
                </form>  

        </div>
        <div class="w-full md:w-1/4 border border-blue-800 rounded">
            <nuxt-link class="border-b border-blue-800 w-full block p-2" :to="'/' + username + '/' + collectionUrl">View Collection</nuxt-link>
            <div class="p-2 text-red-600 c">
                <span class="cursor-pointer" v-if="confirmDelete == false" @click="confirmDelete = true">Delete Collection</span>
                <div v-else>
                    <div class="pb-2">Really Delete Forever?</div>
                    <div>
                        <div class="p-1 rounded bg-red-600 text-white inline-block mr-4 cursor-pointer" @click="deleteCollection()">Yes Delete</div>
                        <div @click="confirmDelete = false" class="p-1 border border-red-600 text-red-600 inline-block cursor-pointer rounded">No Don't</div>
                    </div>
                </div>
            </div>            
        </div>
    </div>
</template>
<script>
    import firebase from 'firebase' 
    import CurrentUser from '~/components/CurrentUser.vue'
    import UserCollections from '~/components/UserCollections.vue'



    export default {
        components: {
            CurrentUser,
            UserCollections
        },
        data: function() {
            return {
                collectionUrl: this.$route.params.collection,
                collectionTitle: '',
                newCollectionTitle: '',
                username: this.$route.params.username,
                items: [],
                newItemId: '',
                userEmail: '',
                editingTitle: false,
                confirmDelete: false
            }
        },
        computed: {
        },
        created() {
            this.getEmailFromUsername()
            
        },
        methods: {  
            getItems() {
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collectionTitle).get().then((doc) => {
                    console.log(doc.data())
                    this.items = doc.data().items
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
                        
                        this.getCollectionTitleFromUrl()
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });                
            },                
            addItem() {
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collectionTitle).update({
                    items: firebase.firestore.FieldValue.arrayUnion(this.newItemId)
                }).then(() => {
                    this.newItemId = ''
                    this.getItems()
                })
            },    
            removeItem(item) {
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collectionTitle).update({
                    items: firebase.firestore.FieldValue.arrayRemove(item)
                }).then(() => {
                    this.getItems()
                })
            },  
            changeCollectionTitle() {
                // firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collection).set({
                // }).then(() => {
                //     this.newItemId = ''
                //     this.getCollections()
                // })
                console.log('change')
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collectionTitle).get().then( (doc) => {
                    console.log(doc)
                    if (doc && doc.exists) {
                        console.log('hello')
                        var data = doc.data();
                        console.log(data)
                        // saves the data to 'name'
                         firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.newCollectionTitle).set(data).then(() =>
                            // deletes the old document
                            {
                             firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collectionTitle).delete();
                             
                            }
                        ).then(() => {
                            console.log('reroute')
                            this.$router.replace('/admin/' + this.username + '/' + this.newCollectionTitle) 
                            this.editingTitle = false
                            this.collectionTitle = this.newCollectionTitle
                            this.getItems()
                        })
                    }
                });                
            },
            deleteCollection() {
                firebase.firestore().collection("users").doc(this.userEmail).collection('Collections').doc(this.collectionTitle).delete().then(() => {
                    console.log("Document successfully deleted!");
                    this.$router.replace('/admin/' + this.username) 
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            },
            getCollectionTitleFromUrl() {
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').where("url", "==", this.collectionUrl)      
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id)
                        this.collectionTitle = doc.id
                    });
                    this.getItems()
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });   
            }                                    
        }
    }
    </script>