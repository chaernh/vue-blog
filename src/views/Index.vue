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
                        <h1 class="title-header">Posts {{ querySearch }}</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="card border-0 rounded shadow mb-3" v-for="(post, index) in filteredPostQuery " :key="index">
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
                                    <input type="search" class="form-control" placeholder="Search..." v-model="querySearch" name="search">
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
                                        <li class="list-group-item p-3 mb-2 custom-margin-bottom" :class="{ active:1 == filter[1].condition }" @click="sort('time')">Sort By Time</li>
                                        <li class="list-group-item p-3 mb-2 custom-margin-bottom" :class="{ active:0 == filter[0].condition }" @click="sort('title')">Sort By Title</li>
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
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

import axios from 'axios'
import moment from 'moment'

import { onMounted, ref, reactive, computed } from 'vue'

export default {
    name: 'Index',
    components: { Navbar, Footer },

    created: function () {
        this.moment = moment;
    },

    setup() {

        //reactive state
        let posts = ref([])
        let querySearch = ref('')
        let selectedFilter = ref(0)
        let filter = reactive([
            {
                name: 'title',
                condition: 0
            },
            {
                name: 'time',
                condition: 0
            }
        ])
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

        function sortedTitle(indicator) {
            if (indicator === 'asc') {
                posts.value.sort((a,b) => (a.title > b.title) ? 1 : -1)
            }
            else {
                posts.value.sort((a,b) => (b.title > a.title) ? 1 : -1)
            }
        }

        function sortedTime(indicator) {
            if (indicator === 'asc') {
                posts.value.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : -1)
            }
            else {
                posts.value.sort((a,b) => (b.createdAt > a.createdAt) ? 1 : -1)
            }
        }

        function getAllPosts() {
            axios.get('http://localhost:3000/api/posts')
            .then(response => {
                console.log('OK', response.data)
                posts.value = response.data
            }).catch(error => {
                console.log(error)
            })
        }

        function sort(obj) {
            let pos = filter.map(function(e) { return e.obj }).indexOf(obj)
            selectedFilter.value = pos

            for (let i = 0; i < filter.length; i++) {
                if (i == selectedFilter.value) {
                    if (selectedFilter.value == 0) {
                        filter[i].condition = 1
                        sortedTime('desc')
                    }
                    if (selectedFilter.value == 1) {
                        filter[i].condition = 1
                        sortedTime('asc')
                    }
                    if (selectedFilter.value == 2) {
                        if (filter[i].condition == 0) {
                            filter[i].condition = 1
                            sortedTitle('asc')
                        }
                        else if (filter[i].condition == 1) {
                            filter[i].condition = 2
                            sortedTitle('desc')
                        }
                        else {
                            filter[i].condition = 1
                            sortedTitle('asc')
                        }
                    }
                }
                else {
                    filter[i].condition = 0
                }
            }
            console.log(pos, selectedFilter.value)
        }

        //mounted
        onMounted(() => {
            getAllPosts()
        })
        
        return {
            posts,
            querySearch,
            filteredPostQuery,
            selectedFilter,
            filter,
            sort
        }
    }
    
}
</script>