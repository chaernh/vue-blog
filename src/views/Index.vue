<template>
    <div id="navbar-section">
        <Navbar />
    </div>
    <div id="body-section">
        <div class="container">
            <div class="row">
                <!-- <div class="header-img"></div> -->
                <div class="row mt-4 mb-2">
                    <div class="col-md-8">
                        <div class="body-section-header py-1 mb-3">
                            <h4>LATEST POSTS</h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="card border-0 rounded shadow mb-3" v-for="(post, index) in posts" :key="index">
                            <div class="card-body">
                                <a href="#" class="hover-no-underlined"><h3>{{ post.title }}</h3></a>
                                <hr>
                                <p>{{ post.body }}</p>
                                <hr>
                                <div class="d-flex justify-content-between">
                                    <span><i class='bx bxs-user mr-1'></i>Chaer</span>
                                    <span><i class='bx bx-time mr-1'></i>21-10-2020</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 rounded shadow">
                            <div class="card-body">
                                <div class="search-section">
                                    <input type="search" class="form-control" placeholder="Search...">
                                </div>
                                <hr>
                                <div class="category-section">
                                    <ul class="list-group">
                                        <li class="list-group-item p-3 mb-2 custom-margin-bottom active">All</li>
                                        <li class="list-group-item p-3 mb-2 custom-margin-bottom">Photography</li>
                                        <li class="list-group-item p-3 mb-2 custom-margin-bottom">Travel</li>
                                        <li class="list-group-item p-3 mb-2 custom-margin-bottom">Sport</li>
                                        <li class="list-group-item p-3 mb-2 custom-margin-bottom">Tech</li>
                                        <li class="list-group-item p-3 mb-2 custom-margin-bottom">Health</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            axios.get('http://localhost:3000/api/posts')
            .then(response => {
                posts.value = response.data
            }).catch(error => {
                console.log(error)
            })
        })
        
        return {
            posts
        }
    }
    
}
</script>