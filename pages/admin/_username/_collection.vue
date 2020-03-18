<template>
    <div>
        
    <nuxt-link class="pr-4" :to="'/' + username + '/' + collection">View Collection</nuxt-link>
       <div v-if="editingTitle == false">
           
           <h1 class="text-3xl inline-block">{{collection}}</h1>
           <span class="pl-2 cursor-pointer" @click="editingTitle = true">edit title</span>
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
        <h2 class="text-xl py-4">Items in collection:</h2>
       <ul>
           <li class="text-xl" v-for="item in items">{{item}} <span class="rounded-full bg-red-200 cursor-pointer hover:bg-red-600 w-4 h-4 inline-block text-center text-sm" @click="removeItem(item)"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span></li>
       </ul>
        <form class="pt-8">
            <input class="border border-blue-600"  type="text" v-model="newItemId">
            <button class="bg-blue-600 rounded px-2 text-white" type="button" @click="addItem">
                Add Item
            </button>  
        </form>  
        <div class="border border-red-300 rounded p-4 mt-8">
            <span class="text-red-600 cursor-pointer" v-if="confirmDelete == false" @click="confirmDelete = true">Delete</span>
            <div class="text-red-600 cursor-pointer" v-else>
                <div class="pb-2">Really Delete Forever?</div>
                <div>
                    <div class="p-2 bg-red-600 text-white inline-block mr-4" @click="deleteCollection()">Yes Delete</div><div @click="confirmDelete = false" class="p-2 border border-red-600 text-red-600 inline-block">No Don't</div>
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
                collection: this.$route.params.collection,
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
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collection).get().then((doc) => {
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
                        this.getItems()
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });                
            },                
            addItem() {
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collection).update({
                    items: firebase.firestore.FieldValue.arrayUnion(this.newItemId)
                }).then(() => {
                    this.newItemId = ''
                    this.getItems()
                })
            },    
            removeItem(item) {
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collection).update({
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
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collection).get().then( (doc) => {
                    console.log(doc)
                    if (doc && doc.exists) {
                        console.log('hello')
                        var data = doc.data();
                        console.log(data)
                        // saves the data to 'name'
                         firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.newCollectionTitle).set(data).then(() =>
                            // deletes the old document
                            {
                             firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collection).delete();
                             
                            }
                        ).then(() => {
                            console.log('reroute')
                            this.$router.replace('/admin/' + this.username + '/' + this.newCollectionTitle) 
                            this.editingTitle = false
                            this.collection = this.newCollectionTitle
                            this.getItems()
                        })
                    }
                });                
            },
            deleteCollection() {
                firebase.firestore().collection("users").doc(this.userEmail).collection('Collections').doc(this.collection).delete().then(() => {
                    console.log("Document successfully deleted!");
                    this.$router.replace('/admin/' + this.username) 
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            }                                      
        }
    }
    </script>