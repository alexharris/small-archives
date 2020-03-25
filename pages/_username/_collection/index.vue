<template>
    <div>
        <!-- GRID -->
        <div class="border border-blue-800 my-2">
            <h1 class="text-3xl mt-8 mb-10 w-full text-center font-bold">{{collectionTitle}}</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-center">
                <div v-for="item in itemMetadata"  class="flex flex-col items-center mb-8 w-48 mx-auto">
                    <!-- {{item.metadata.mediatype}} -->
                    <!-- {{item.JPEGThumb}} -->
                    <div class="w-full pb-2 ">
                        <nuxt-link v-if="item.metadata.mediatype != 'audio'" :to="collectionUrl + '/' + item.metadata.identifier">
                            <img class="cursor-pointer w-full"  :src="'https://' + item.server + '/' + item.dir + '/' + item.JPEGThumb[0]"  />
                        </nuxt-link>
                        <nuxt-link v-else :to="collectionUrl + '/' + item.metadata.identifier" class="flex justify-center h-full w-full">
                            <img v-if="item.JPEGThumb != ''" :src="'https://' +
                            item.server + '/' +
                            item.dir + '/' + item.JPEGThumb[0]" />
                            <div v-else class="w-full flex items-center justify-center  py-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c5282" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                            </div>
                        </nuxt-link>
                    </div>
                    <div class="text-center w-full p-1">
                        <p class="text-sm pb-2">{{item.metadata.mediatype}}</p>
                        <nuxt-link class="text-lg cursor-pointer hover:underline" :to="collectionUrl + '/' + item.metadata.identifier">{{item.metadata.title}}</nuxt-link>
                    
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
    import FullScreen from '~/components/FullScreen.vue'


    export default {
        components: {
            CurrentUser,
            FullScreen,
            UserCollections
        },
        data: function() {
            return {
                collectionUrl: this.$route.params.collection,
                collectionTitle: '',
                username: this.$route.params.username,
                userEmail: '',
                items: [],
                itemMetadata: [],
                currentItem: ''
            }
        },
        computed: {


        },
        created() {
            this.getEmailFromUsername()
            
            
        },
        methods: {  
            makeCurrent(metadata) {
                console.log('make current:' + metadata.identifier)
                this.currentItem = metadata
            },
            getItemMetadata() {
                this.items.forEach((id) => {
                    this.getItemsMetadata(id)
                })
            },
            async getItemsMetadata(id) {                
                const itemMetadata = await this.$axios.$get('https://archive.org/metadata/' + id)
                // console.log(itemMetadata)
                this.itemMetadata.push(itemMetadata)
                itemMetadata['JPEG'] = []
                itemMetadata['JPEGThumb'] = []
                itemMetadata['width'] = []
                itemMetadata['height'] = []
                itemMetadata['files'].forEach((file) => {
                    // If its a JPEG, get the filename
                    if(file.format == 'JPEG') {
                        itemMetadata['JPEG'].push(file.name)
                    }
                    
                    // If its audio and has a PNG, get that
                    if(itemMetadata.metadata.mediatype == 'audio' && file.format == 'PNG') {
                        itemMetadata['JPEGThumb'].push(file.name)
                    }

                    // If its a JPEG thumb, or PNG for audio, get image, else get the ia_thumb 
                    if( itemMetadata.metadata.mediatype !== 'audio') {                 
                        if(file.format == 'JPEG Thumb') {
                            itemMetadata['JPEGThumb'].push(file.name)
                        } else {
                            itemMetadata['JPEGThumb'].push('__ia_thumb.jpg')
                        }      
                    } 
                    
                    // For movies, get the width and height
                    if(itemMetadata.metadata.mediatype == 'movies' && file.width !== undefined && file.source == 'original') {
                        itemMetadata['width'].push(file.width)
                        itemMetadata['height'].push(file.height)
                    }

                })
            },          
            getCollections() {
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').doc(this.collectionTitle).get().then((doc) => {
                    this.items = doc.data().items
                }).then(() => {
                    this.getItemMetadata()
                })
            },
            getEmailFromUsername() {
                firebase.firestore().collection('users').where("username", "==", this.username)      
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        this.userEmail = doc.id
                        this.getCollectionTitleFromUrl() 
                        
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });                
            },   
            getCollectionTitleFromUrl() {
                firebase.firestore().collection('users').doc(this.userEmail).collection('Collections').where("url", "==", this.collectionUrl)      
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        this.collectionTitle = doc.id
                    });
                    // this.getItems()
                    this.getCollections()
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });   
            }                         
        }
    }
    </script>