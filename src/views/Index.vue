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
                        <div class="text-center mt-5">
                            <router-link :to="{name: 'posts'}">
                                <button class="btn btn-outline-success">See more</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        let filter = ref([
            {
                name: 'title',
                condition: 0
            },
            {
                name: 'time',
                condition: 0
            }
        ])

        // function sortedTitle(indicator) {
        //     if (indicator === 'asc') {
        //         posts.value.sort((a,b) => (a.title > b.title) ? 1 : -1)
        //     }
        //     else {
        //         posts.value.sort((a,b) => (b.title > a.title) ? 1 : -1)
        //     }
        // }

        // function sortedTime(indicator) {
        //     if (indicator === 'asc') {
        //         posts.value.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : -1)
        //     }
        //     else {
        //         posts.value.sort((a,b) => (b.createdAt > a.createdAt) ? 1 : -1)
        //     }
        // }

        function getAllPosts() {
            axios.get('http://localhost:3000/api/posts')
            .then(response => {
                console.log('OK', response.data)
                posts.value = response.data
            }).catch(error => {
                console.log(error)
            })
        }

        //mounted
        onMounted(() => {
            getAllPosts()
        })
        
        return {
            posts,
            selectedFilter,
            filter,
            loading
        }
    }
    
}
</script>