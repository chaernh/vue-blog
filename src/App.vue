<template>
  <router-view></router-view>
</template>

<script>
import {computed} from 'vue';
import {useStore} from "vuex";

export default {
  name: 'App',

  setup() {
    const store = useStore()
    
    let credential = computed(() => {
      return store.state
    })

    return {
      credential
    }
  }
}
</script>

<style>
  @import './assets/css/style.css'
</style>
