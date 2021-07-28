<template>
    <div id="Index">
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <div class="left">
                    <router-link :to="{name: 'index'}" class="navbar-brand">
                        <img src="../assets/logo.png" alt="logo" height="24" class="d-inline-block align-text-top">
                    </router-link>
                </div>
                <div class="right">
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
                </div>
            </div>
        </nav>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="login-box row">
                        <div class="col-md-12">
                            <div class="header text-center">
                                <img src="../assets/logo.png" alt="logo">
                                <figure class="text-center">
                                    <blockquote class="blockquote">
                                        <p>A well-known quote, contained in a blockquote element.</p>
                                    </blockquote>
                                    <figcaption class="blockquote-footer">
                                        Someone famous in <cite title="Source Title">Source Title</cite>
                                    </figcaption>
                                </figure>
                            </div>
                            <hr>
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control">
                            </div>
                            <div class="d-grid mb-3">
                                <button class="btn btn-success">Login</button>
                            </div>
                            <hr>
                            <div class="text-center">
                                <p>Don't have an account? Sign up <a href="#">here</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>