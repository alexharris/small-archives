<template>
    <div>
        <!-- <pre>{{item.metadata}}</pre> -->
        
        <div class="border-b border-blue-800 py-2">
            <nuxt-link :to="'/' + this.$route.params.username + '/' + this.$route.params.collection">Back</nuxt-link>
        </div>
        <h1 class="lg:hidden text-2xl font-bold py-6">{{item.metadata.title}}</h1>
        <div class="flex flex-col lg:flex-row">
            <div class="flex flex-col items-center lg:w-8/12 lg:px-4 my-4">
                <!-- Iframe for video and audio -->
                <iframe v-if="item.metadata.mediatype == 'movies' || item.metadata.mediatype == 'audio'" :width="item.width" :height="item.height" class="w-full pb-8" :src="'https://archive.org/embed/' + item.metadata.identifier" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>
                <!-- JPEGs for images -->
                <div class="pb-4" v-if="item.metadata.mediatype == 'image'" v-for="image in item.JPEG">
                    <img  :src="'https://' + item.server + item.dir + '/' + image" />
                </div>
            </div>
            <div class="lg:w-4/12">
            
                <div class="lg:p-4">
                
                    <ul>
                        <li class="text-xl hidden lg:block"><strong>{{item.metadata.title}}</strong></li>
                        <li class="pt-4">{{item.metadata.date}}</li>
                        <li class="pt-4"><div  v-html="item.metadata.description"></div></li>
                    </ul>
                    <a :href="'https://archive.org/details/' + item.metadata.identifier" class="inline-block mt-4 p-2 text-center border text-blue-800 border-blue-800 text-white hover:bg-blue-100 rounded">
                        View on Internet Archive
                    </a>

                    <!-- {{item}} -->

                </div>
            </div>
        </div>        
    </div>
</template>
<script>
    import firebase from 'firebase' 



    export default {
        components: {

        },
        data: function() {
            return {
                itemId: this.$route.params.item,
                item: {
                    metadata: []
                }
            }
        },
        computed: {


        },
        created() {
            this.getItemData(this.itemId)
        },
        methods: {  
            async getItemData() {
                this.item = await this.$axios.$get('https://archive.org/metadata/' + this.$route.params.item)
                this.getItemsMetadata(this.item)
            },
            getItemsMetadata() {                
                // console.log(this.item['files'])
                this.item['JPEG'] = []
                this.item['width'] = []
                this.item['height'] = []

                this.item['files'].forEach((file) => {
                    // If its a JPEG, get the filename
                    if(file.format == 'JPEG') {
                        console.log('JPEG')
                        this.item['JPEG'].push(file.name)
                    }
            
                    // For movies, get the width and height
                    if(this.item.metadata.mediatype == 'movies' && file.width !== undefined && file.source == 'original') {
                        this.item['width'].push(file.width)
                        this.item['height'].push(file.height)
                    }

                })
            },                        
        }
    }
    </script>