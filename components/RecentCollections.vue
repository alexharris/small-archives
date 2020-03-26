<template>
    <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2 mb-8">
            <h3 class="text-xl pb-4"><strong>Recent Collections</strong></h3>
            <ul>
                <li><a class="underline hover:no-underline" href="/demo/small-archives-demo">Small Archives Demo</a></li>
                <li><a class="underline hover:no-underline" href="/test/birds-of-lake-merritt">Birds of Lake Merritt</a></li>
            </ul>   
            <!-- <ul>
                <li v-for="collection in collections">
                    <a href="/">{{collection[0]}}</a>
                </li>
            </ul> -->
        </div>
        <div class="w-full lg:w-1/2">
            <h3 class="text-xl pb-4"><strong>Features Roadmap</strong></h3>
            <p class="pb-4">Here are some features that we hope to add sometime soon:</p>
            <ul class="list-disc list-inside pb-4">
                <li>Data export</li>
                <li>Collection style options</li>
                <li>User profiles</li>
                <li>Books, TV, Software, etc</li>
                <li>Other data sources</li>
                <li>Enhanced displays for more advanced data</li>
            </ul>
            <p>Got an idea? Let us know on twitter @smallarchives or via email at smallarchives@gmail.com</p>
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
                emails: [],
                collections: []

            }
        },
        computed: {
             
        },
        created() {
            this.getEmails()
        },
        methods: {         
            getEmails() {
                firebase.firestore().collection("users").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        this.emails.push(doc.id)
                    });
                }).then((id) => {
                    console.log(id)
                    this.getCollections()
                })
            },    
            getCollections() {
                
                // this.emails.forEach((email) => {
                //     console.log('get email')
                //     var collection = []
                //     // get Username
                //     firebase.firestore().collection("users").doc(email).get().then((doc) => {
                        
                //         // doc.data() is never undefined for query doc snapshots
                //         console.log(doc.data().username)
                //         collection.username = doc.data().username
                //         console.log('get collection data')

                //         firebase.firestore().collection("users").doc(email).collection("Collections").get().then((querySnapshot) => {
                //             querySnapshot.forEach((doc) => {
                //                 // doc.data() is never undefined for query doc snapshots
                //                 if(doc.id !== 'First Collection' && doc.data().items.length > 0) {
                //                     console.log(doc.data())
                //                     collection.title = doc.id
                //                     collection.url = doc.data().url
                //                 }
                //             });
                //             console.log(collection)
                //         }).then(() => {
                            
                //             this.collections.push(collection)
                //         })                            
                        
                //     })




                    
                // })
            }    
        }
    }
    </script>