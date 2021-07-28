<template>
    <div id="navbar-section">
        <Navbar />
    </div>
    <div id="body-section">
        <div class="container">
            <div class="row">
                <h1>ini bagian body</h1>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    name: 'Index',
    components: { Navbar },

    setup() {

        //reactive state
        let posts = ref([])

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get('http://localhost:3000/api/posts')
            .then(response => {

                //assign state posts with response data
                posts.value = response.data.data

            }).catch(error => {
                console.log(error)
            })

        })

        //return
        return {
            posts
        }
    }
    
}

</script>