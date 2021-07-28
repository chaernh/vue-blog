<template>
    <div id="navbar-section" class="mb-5">
        <Navbar />
    </div>
    <div id="body-section" class="mb-5">
        <div class="container">
            <div class="row">
                <div class="row mt-4 mb-2">
                    <div class="col-md-12">
                        <div class="body-section-header bg-primary-1 py-1 mb-3"></div>
                        <h1 class="title-header">Posts</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="card border-0 rounded shadow mb-3" v-for="(post, index) in posts" :key="index">
                            <div class="card-body">
                                <a href="#" class="hover-no-underlined"><h3>{{ post.title }}</h3></a>
                                <hr>
                                <p>{{ post.body }}</p>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between">
                                    <span><i class="fas fa-user"></i>Chaer</span>
                                    <span><i class='bx bx-time mr-1'></i>{{ moment(post.createdAt).fromNow() }}</span>
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
                                    <div class="p-3">
                                        <a href="#">See more</a>
                                    </div>
                                </div>
                                <hr>
                                <div class="filter-section">
                                    <ul class="list-group">
                                        <li class="list-group-item p-3 mb-2 custom-margin-bottom">Sort By Time</li>
                                        <li class="list-group-item p-3 mb-2 custom-margin-bottom">Sort By Title</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="footer-section">
        <Footer />
        <!-- <div class="footer bg-primary-1 py-5 text-center">
            <span>Made with ♥ by <a href="https://chaerfansyah-nh.web.app" class="text-white">chaernh</a></span>
        </div> -->
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios'
import moment from 'moment'
import { onMounted, ref } from 'vue'

export default {
    name: 'Index',
    components: { Navbar, Footer },

    created: function () {
        this.moment = moment;
    },

    setup() {


        //reactive state
        let posts = ref([])

        //mounted
        onMounted(() => {
            axios.get('http://localhost:3000/api/posts')
            .then(response => {
                posts.value = response.data
                console.log(response.data.createdAt)
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