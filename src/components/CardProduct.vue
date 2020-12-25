<template>
  <div class="card shadow card-product">
    <img :src="'../assets/image/images/' + product.gambar" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{product.nama}}</h5>
      <p
        class="card-text"
      >Harga : Rp {{product.harga}}
      </p>
      <router-link :to="'/foods/' + product.id" class="btn btn-success"><b-icon-cart></b-icon-cart> pesan</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardProduct",
  props: ["product"] // promps itu mengambil dengan persetujuan terkait 
}; 
</script>

<style>
</style>