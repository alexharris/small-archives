

<template>
    <div>
        <template v-if="this.userStatus">
        Item List
        <div v-for="item in items">            
            {{item}}
        </div>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" v-model="newItemId">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="addItem">
                Add Item
            </button>  
        </form>  
        tests: {{newItemId}}
        </template>
        <template v-else>
            No user
        </template>  
    </div>
</template>
<script>
    import firebase from 'firebase' 

    export default {
        components: {
            
        },
        data: function() {
            return {
                newItemId: '',
                items: [],
            }
        },
        computed: {
            userStatus() {
                return this.$store.state.userSignedIn
            }
        },
        created() {
            this.getItems()
        },
        methods: {  
            addItem() {
                firebase.firestore().collection('email').doc('collection').update({
                    items: firebase.firestore.FieldValue.arrayUnion(this.newItemId)
                }).then(() => {
                    this.newItemId = ''
                    this.getItems()
                })

            },
            getItems() {
                firebase.firestore().collection('email').doc("collection")
                    .onSnapshot((doc) => {
                        console.log(doc.data().items)
                        this.items = doc.data().items
                    });  
            }
        }
    }
    </script>