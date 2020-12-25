<template>
  <div class="home">
    <NavBar />
    <div class="container">
      <Hero />

      <div class="row mt-4">
        <div class="col">
          <h2>Best <strong>Foods</strong></h2>
        </div>
        <div class="col">
          <router-link to="/foods" class="btn btn-success float-right"><b-icon-eye></b-icon-eye> Lihat Semua</router-link>
        </div>
      </div>
      <div class="row mb-4">
          <div class="col-md-4 mt-4" v-for="productx in products" :key="productx.id">
            <CardProduct :product="productx"/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue' // caracter yang di pakai 
import Hero from '@/components/Hero.vue'
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: 'Home',
  components: {
    NavBar,
    Hero,
    CardProduct   
  },
  data(){
    return{
      products:[] //  -> di tampung (Wadah) proses ke tiga
    }
  },
  methods:{
    setProduct(data){
      this.products=data //Kedua Ini
    }
  },
  mounted(){
    axios.get('http://localhost:3000/best-products')
    .then((response)=> {
      // handle success
      this.setProduct(response.data) // -> proses ini dulu
    })
    .catch((error)=>{
      // handle error
      console.log("Gagal : ",error);
    })
  }
}
</script>
