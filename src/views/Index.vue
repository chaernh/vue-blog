<template>
    <div id="navbar-section" class="mb-5">
        <Navbar />
    </div>
    <div id="posts-section" class="mb-5">
        <div class="container">
            <div class="row">
                <div class="my-4 mb-5 d-flex justify-content-center">
                    <div class="custom-border-bottom text-center">
                        <h3 class="color-black">Latest Post</h3>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="row" v-if="loading.posts">
                        <div class="loading-state" v-if="loading.posts">
                            Loading data...
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div class="col-md-4 mb-3" v-for="(post, index) in posts.slice(0, 7)" :key="index">
                            <div class="card border-0 rounded shadow custom-height position-relative">
                                <div class="post-card">
                                    <div class="post-img">
                                        <img src="https://picsum.photos/200" alt="picsum/200">
                                    </div>
                                    <div class="post-title">
                                        <a href="#" class="hover-no-underlined">{{ post.title.substring(0,75) }}</a> 
                                    </div>
                                    <div class="post-category">
                                        <span class="badge rounded-pill bg-primary">Tech</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-3">
                            <router-link :to="{name: 'posts'}">
                                <button class="btn btn-outline-success">See more</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="hide-desktop">
            <span class="float">
                <i class='bx bxs-category my-float bx-md' style='color:#ffffff' v-b-modal.filterModal></i>
            </span>
        </div> -->
    </div>
    <div id="footer-section">
        <Footer />
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

import axios from 'axios'
import moment from 'moment'

import { onMounted, ref, reactive } from 'vue'

export default {
    name: 'Index',
    components: { Navbar, Footer },

    created: function () {
        this.moment = moment;
    },

    setup() {

        let posts = ref([])
        let selectedFilter = ref(0)
        let loading = reactive({
            posts: false
        })

        function getAllPosts() {
            loading.posts = true
            axios.get('http://localhost:3000/api/posts')
            .then(response => {
                posts.value = response.data
                loading.posts = false
            }).catch(error => {
                console.log(error)
                loading.posts = false
            })
        }

        //mounted
        onMounted(() => {
            getAllPosts()
        })
        
        return {
            posts,
            selectedFilter,
            loading
        }
    }
    
}
</script>