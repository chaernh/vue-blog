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

export default {
    name: 'Index',
    components: { Navbar }
}

</script>