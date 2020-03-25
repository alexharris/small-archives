

<template>
  <div >  
      <!-- class="w-full h-screen top-0 left-0 absolute flex flex-col items-center justify-center" -->

        <!-- This is the modal -->
        <div class="z-40 bg-white block relative h-screen overflow-y-auto m-2">
            <!-- class="bg-white sm:w-11/12 md:p-8 m-4 md:my-24 inline-block z-40 overflow-scroll relative" -->
            <slot></slot>
        </div>
        <!-- This is the transparent BG -->
        <div class="absolute top-0 right-0 w-full h-screen bg-black bg-black opacity-50"></div>        
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