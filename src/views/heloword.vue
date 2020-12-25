<template>
  <div class="container">
    <NavBar />
    <i class="fas fa-h2"></i>

    <div class="container">
      <div class="row">
            <div class="card" style="width: 18rem;">
                <div class="card-body" >
                    <h5 class="card-title">{{this.product.Title}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{this.product.Actors}}</h6>
                    <p
                    class="card-text"
                    ></p>
                    <a href="#" class="card-link"></a>
                    <a href="#" class="card-link"></a>
                </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
export default {
  name: "Hello",
  components: {
    NavBar
  },
  data() {
    return {
      product: {}
    };
  },
  methods: {
    setKarakter(data) {
      this.product= data;
    }
  },
  mounted() {
    axios
      .get("http://www.omdbapi.com/?apikey=379591eb&i=tt0458339")
      .then(response => {
        // handle success
       
        this.setKarakter(response.data);
      })
      .catch(error => {
        // handle error
        console.log("Gagal ss: ", error);
      });
  }
};
</script>

<style>
</style>