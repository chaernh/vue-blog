<template>
    <nav class="navbar fixed-top navbar-light bg-light">
        <div class="container-fluid">
            <div class="left d-flex flex-row align-items-center">
                <router-link :to="{name: 'index'}" class="navbar-brand">
                    <img src="../assets/logo.png" alt="logo" height="24" class="d-inline-block align-text-top">
                </router-link>
                <router-link :to="{name: 'index'}" class="navbar-link hover-no-underlined mx-3 hide-mobile">
                    Home
                </router-link>
                <router-link :to="{name: 'posts'}" class="navbar-link hover-no-underlined mx-3 hide-mobile">
                    Posts
                </router-link>
            </div>
            <div class="right d-flex flex-row align-items-center">
                <div class="author d-flex flex-row align-items-center mx-3 hide-mobile" v-if="credential.isLoggedIn">
                    <div class="avatar-img">
                        <img src="https://picsum.photos/200" alt="avatar">
                    </div>
                    <a href="#" class="px-2 color-black">{{ credential.user.username }}</a>
                </div>
                <button class="navbar-toggler hide-desktop" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbar" aria-controls="offcanvasRight">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <button class="btn btn-success hide-mobile" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="!credential.isLoggedIn">Login</button>
                <button class="btn btn-danger hide-mobile" @click="logout" v-else>Logout</button>
            </div>
        </div>
    </nav>

    <!-- Login modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="login-box row">
                        <div class="col-md-12">
                            <div class="header text-center">
                                <img src="../assets/logo.png" alt="logo">
                                <!-- <figure class="text-center">
                                    <blockquote class="blockquote">
                                        <p>A well-known quote, contained in a blockquote element.</p>
                                    </blockquote>
                                    <figcaption class="blockquote-footer">
                                        Someone famous in <cite title="Source Title">Source Title</cite>
                                    </figcaption>
                                </figure> -->
                            </div>
                            <hr>
                            <form @submit.prevent="login">
                                <div class="mb-3">
                                    <label for="username" class="form-label">Username</label>
                                    <input type="text" class="form-control" v-model="form.username">
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" autocomplete="off" v-model="form.password">
                                </div>
                                <div class="d-grid mb-3">
                                    <button class="btn btn-success" type="submit">Login</button>
                                </div>
                            </form>
                            <hr>
                            <div class="text-center">
                                <p>Don't have an account? Sign up <a href="#">here</a>.</p>
                                <p class="custom-font">or</p>
                                <p>Lost your password? Click <a href="#">here</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- off canvas -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="navbar" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header mb-5">
            <img src="../assets/logo.png" alt="logo" height="24" class="d-inline-block align-text-top">
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="row h-100">
                <div class="links px-4">
                    <div class="d-flex flex-column">
                        <router-link :to="{name: 'index'}" class="hover-no-underlined">
                            Home
                        </router-link>
                        <router-link :to="{name: 'posts'}" class="hover-no-underlined">
                            Posts
                        </router-link>
                    </div>
                </div>
                <div class="button-section mt-auto">
                    <button class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="!credential.isLoggedIn">Login</button>
                    <div v-else>
                        <div class="author d-flex flex-row align-items-center mx-3 hide-mobile">
                            <div class="avatar-img">
                                <img src="https://picsum.photos/200" alt="avatar">
                            </div>
                            <a href="#" class="px-2 color-black">{{ credential.user.username }}</a>
                        </div>
                        <button class="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">Logout</button>

                    </div>
                </div>
            </div>
            
        </div>
    </div>

</template>

<script>

import { computed, reactive } from 'vue'
// import { useRouter } from 'vue-router'
import axios from 'axios'
import { useStore } from "vuex"

export default {

    name: 'Navbar',
    setup() {

        const store = useStore()

        const form = reactive({
            username: '',
            password: ''
        })

        let credential = computed(() => {
            return store.state
        })

        // const router = useRouter()

        function login() {
            let username = form.username
            let password = form.password

            axios.post('http://localhost:3000/auth/login', {}, {
                auth: {
                    username: username,
                    password: password
                }
            }).then((res) => {
                store.commit('storeCredential', res.data)
                form.username = ''
                form.password = ''
            }).catch(e => {
                form.username = ''
                form.password = ''
                console.log(e)
            })
        }

        function logout() {
            store.commit('removeCredential')
        }

        return {
            form, login, logout, credential
        }
    }
}
</script>