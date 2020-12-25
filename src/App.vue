<template>
  <div id="app">   
    <router-view/>
    <Footer />
  </div>
</template>

<script>

import Footer from "@/components/footer.vue";
export default {
  components:{
    Footer
  }
}
</script>


