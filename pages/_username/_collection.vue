<template>
    <div>

        <FullScreen v-if="currentItem !== ''">
            <span class="p-2 top-0 right-0 absolute cursor-pointer stroke-current border border-white hover:border-blue-800 m-2 rounded-full" @click="makeCurrent('')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </span>
            <div class="flex flex-row">
                <div class="flex flex-col items-center w-3/4 px-8">
                    <iframe v-if="currentItem.metadata.mediatype == 'movies' || currentItem.metadata.mediatype == 'audio'" :width="currentItem.width" :height="currentItem.height" class="w-full pb-8" :src="'https://archive.org/embed/' + currentItem.metadata.identifier" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>
                    <div class="py-4" v-if="currentItem.metadata.mediatype == 'image'" v-for="image in currentItem.JPEG">
                        <img  :src="'https://' + currentItem.server + currentItem.dir + '/' + image" />
                    </div>
                </div>
                <div class="w-1/4 ">
                    <ul>
                        <li class="text-xl"><strong>{{currentItem.metadata.title}}</strong></li>
                        <li>{{currentItem.metadata.date}}</li>
                        <!-- <li<p v-html="currentItem.metadata.description"></p></li> -->
                    </ul>
                    <!-- <pre>{{currentItem.JPEGThumb}}</pre>
                    <pre>{{currentItem.files}}</pre> -->
                </div>
            </div>
        </FullScreen>    
        <div>
            <h1 class="text-3xl my-16 w-full text-center">{{collectionTitle}}</h1>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
                <div v-for="item in itemMetadata"  class="flex flex-col items-center mb-8 w-48 mx-auto">
                    <!-- {{item.metadata.mediatype}} -->
                    <!-- {{item.JPEGThumb}} -->
                    <div class="w-full pb-2 h-40">
                        <img class="cursor-pointer" v-if="item.metadata.mediatype != 'audio'" :src="'https://' +
                        item.server + '/' +
                        item.dir + '/' + item.JPEGThumb[0]" @click="makeCurrent(item)" />
                        <div v-else class="flex justify-center h-full w-full">
                            <img v-if="item.JPEGThumb != ''" :src="'https://' +
                            item.server + '/' +
                            item.dir + '/' + item.JPEGThumb" @click="makeCurrent(item)" />
                            <svg v-else @click="makeCurrent(item)" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                        </div>
                    </div>
                    <div class="text-center w-full">
                    <p class="text-sm pb-2">{{item.metadata.mediatype}}</p>
                    <p class="text-lg">{{item.metadata.title}}</p>
                    
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