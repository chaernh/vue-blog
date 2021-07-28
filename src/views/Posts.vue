<template>
    <div id="posts-page">
        <div id="navbar-section" class="mb-5">
            <Navbar />
        </div>
        <div id="posts-section" class="mb-5">
            <div class="container">
                <div class="row">
                    <div class="row mt-4 mb-2">
                        <div class="col-md-12">
                            <div class="posts-section-header bg-primary-1 py-1 mb-3">
                                <h1 class="title-header">Posts</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8 mobile-custom-col-12">
                            <div class="row">
                                <div class="custom-col mb-3" v-for="(post, index) in filteredPostQuery" :key="index">
                                    <div class="card border-0 rounded shadow custom-height position-relative">
                                        <div class="post-card">
                                            <div class="post-img">
                                                <img src="https://picsum.photos/200" alt="picsum/200">
                                            </div>
                                            <div class="post-title">
                                                <a href="#" class="hover-no-underlined">{{ post.title }}</a> 
                                                <!-- max 75 char -->
                                            </div>
                                            <div class="post-category">
                                                <span class="badge rounded-pill bg-primary">Tech</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 hide-mobile">
                            <div class="card border-0 rounded shadow">
                                <div class="card-body">
                                    <div class="search-section">
                                        <input type="search" class="form-control" placeholder="Search..." v-model="querySearch" name="search">
                                    </div>
                                    <hr>
                                    <div class="category-section">
                                        <ul class="list-group">
                                            <li class="list-group-item p-3 mb-2 custom-margin-bottom active">All</li>
                                            <li class="list-group-item p-3 mb-2 custom-margin-bottom">Photography</li>
                                            <li class="list-group-item p-3 mb-2 custom-margin-bottom">Travel</li>
                                            <li class="list-group-item p-3 mb-2 custom-margin-bottom">Sport</li>
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
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

import axios from 'axios'
// import moment from 'moment'

import { onMounted, ref, computed } from 'vue'

export default {
    name: "Posts",
    components: { Navbar, Footer },
    setup() {
        let posts = ref([])
        let querySearch = ref('')

        let filteredPostQuery = computed(() => {
            var post = posts.value
            var query = querySearch.value.toLowerCase()
            if (!query) {
                return post
            } 
            else {
                query.trim().toLowerCase()
                post = post.filter(function (item) {
                    if (item.title.toLowerCase().indexOf(query) !== -1) {
                        return item
                    }
                })
                return post 
            }
        })

        function getAllPosts() {
            axios.get('http://localhost:3000/api/posts')
            .then(response => {
                console.log('OK', response.data)
                posts.value = response.data
            }).catch(error => {
                console.log(error)
            })
        }

        onMounted(() => {
            getAllPosts()
        })

        return {
            posts, filteredPostQuery, querySearch
        }
    }
}
</script>