<template>
  <div id="app">
    <router-view />
    <!-- <div>{{this.$route.meta.showFooter}}</div> -->
    <footer-guide v-show="$route.meta.showFooter" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  components: {
    FooterGuide,
  },
  mounted() {
    console.log('开始请求数据')
    this.getAddress()
  },
  methods: {
    ...mapActions(['getAddress']),
  },
}
</script>
<style lang="stylus">
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
