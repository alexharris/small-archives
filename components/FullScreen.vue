

<template>
  <div class="modal w-full h-full top-0 left-0 absolute flex flex-col items-center  justify-center">        
    <div class="w-full h-full absolute top-0 right-0 bg-black bg-black opacity-50"></div>
        <div class="bg-white w-full md:w-3/4 p-12 z-40 relative">
            <slot></slot>
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

            }
        },
        computed: {          
        },
        created() {


        },
        methods: {  

        }
    }
</script>