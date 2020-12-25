<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-4">
          <h2>
            Daftar
            <strong>Makanan</strong>
          </h2>
        </div>
      </div>
      <div class="row-mt-3">
        <div class="col mr-5">
          <div class="input-group mb-3">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Mau Makan Apa ?"
              aria-label="cari"
              aria-describedby="basic-addon1"
              @keyup="searchFood"
            />
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "Foods",
  components: {
    NavBar,
    CardProduct
  },
  data () {
    return {
      products: [],
      search:""
    }
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
    searchFood(){
       axios
      .get("http://localhost:3000/products?q="+this.search)
      .then(response =>{ console.log(response);
        this.setProduct(response.data)})
      .catch(error =>{console.log("Gagal : ", error)});
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then(response => {
        // handle success
        this.setProduct(response.data);
      })
      .catch(error => {
        // handle error
        console.log("Gagal : ", error);
      });
  }
};
</script>

<style>
</style>