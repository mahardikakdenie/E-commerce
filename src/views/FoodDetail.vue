<template>
    <div class="food-detail">
        <NavBar />
        <div class="container">
            <!-- BreadCrumb -->
            <div class="row mt-5">
                <div class="col">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-dark">HOME</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/foods" class="text-dark">FOOD</router-link>
                            </li>
                            <li class="breadcrumb-item aktiv">
                                <router-link to="" class="text-dark">Food Order</router-link>
                            </li>                   
                        </ol>
                    </nav>
                </div>
            </div>
            <!-- foodDetail -->
            <div class="row">
                <div class="col-md-6 ">
                    <img :src="'../assets/image/images/'+products.gambar"  class="img-fluid shadow"/>
                </div>
                <div class="col-md-6">
                    <h2><strong> {{products.nama}} </strong></h2>
                    <hr>
                    <h4>Harga : Rp. {{products.harga}}</h4>
                    <form class="mt-4" v-on:submit.prevent>
                        <div class="form-grup">
                            <label for="jumlah pemesanan">Jumlah Pesan</label>
                            <input 
                                type="number" class="form-control" 
                                placeholder="Mau Pesan Berapa?"
                                v-model="pesan.jumlah_pemesanan"
                            /> 
                        </div>
                        <div class="form-grup">
                            <label for="Keterangan">Keterangan</label>
                            <textarea 
                                v-model="pesan.keterangan"
                                class="form-control"
                                placeholder="keterangan seperti:Pedas,Nasi Setengah,..">
                            </textarea> 
                        </div>
                        <button 
                            @click="pemesanan"
                            type="submit" 
                            class="btn btn-success"
                            ><b-icon-cart></b-icon-cart> 
                            Pesan
                        </button>
                    </form>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios"

export default {
  name: "FoodDetail",
  components: {
    NavBar
  },
  data(){
      return{
          products:{},
          pesan:{},
      }
  },
  methods:{
      setProduct(data){
          this.products=data
      },
      pemesanan(){
         if(this.pesan.jumlah_pemesanan){
            this.$router.push({ path:"/keranjang"})
            this.pesan.products=this.products
          axios
            .post("http://localhost:3000/keranjangs",this.pesan)
            .then(()=>{ this.$toast.success('Sukses Masuk Keranjang', {
                type:"success",
                position:"top-right",
                duration:3000,
                dismissible:true
            })
                
            })
            .catch((err)=>{console.log(err)})
         }else{
             this.$toast.error('Jumlah Pesanan Harus Di isi', {
                type:"error",
                position:"top-right",
                duration:3000,
                dismissible:true
            })
         }
      }
  },
  mounted(){
         axios
      .get("http://localhost:3000/products/"+this.$route.params.id)
      .then(response =>{this.setProduct(response.data)})
      .catch(error =>{console.log("Gagal : ", error)});
    }
};
</script>

<style>
</style>