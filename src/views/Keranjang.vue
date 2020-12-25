<template>
  <div class="Keranjang">
    <NavBar :updateKeranjang="keranjang" />
    <div class="container">
      <!-- BreadCrumb -->
      <div class="row mt-4">
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
                <router-link to class="text-dark">Keranjang</router-link>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>
            Keranjang
            <strong>Saya</strong>
          </h2>
          <div class="tabel-reponsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(keranjangs,index) in keranjang" :key="keranjangs.id">
                  <th>{{index+1}}</th>
                  <td>
                    <img
                      :src="'../assets/image/images/'+keranjangs.products.gambar"
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>
                    <strong>{{keranjangs.products.nama}}</strong>
                  </td>
                  <td align="center">{{keranjangs.keterangan ? keranjangs.keterangan : "-"}}</td>
                  <td>{{keranjangs.jumlah_pemesanan}}</td>
                  <td align="right">Rp.{{keranjangs.products.harga}}</td>
                  <td align="right">
                    <strong>Rp.{{keranjangs.products.harga * keranjangs.jumlah_pemesanan}}</strong>
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash @click="hapusKeranjang(keranjangs.id)"></b-icon-trash>
                  </td>
                </tr>
                <tr align="right">
                  <td colspan="6" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td align="right">
                    <strong>{{totalHarga}}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- form cheout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-grup">
              <label for="nama">Nama</label>
              <input
                type="text"
                class="form-control"
                placeholder="Mau Pesan Berapa?"
                v-model="pesan.nama"
              />
            </div>
            <div class="form-grup">
              <label for="noMeja">Nomor Meja</label>
              <input
                type="text"
                class="form-control"
                placeholder="Mau Pesan Berapa?"
                v-model="pesan.noMeja"
              />
            </div>
            <button @click="Checkout" type="submit" class="btn btn-success float-right">
              <b-icon-cart></b-icon-cart>Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
export default {
  name: "Keranjang",
  components: {
    NavBar
  },
  data() {
    return {
      keranjang: [],
      pesan: {}
    };
  },
  methods: {
    setKeranjang(data) {
      this.keranjang = data;
    },
    hapusKeranjang(id) {
      axios
        .delete("http://localhost:3000/keranjangs/" + id)
        .then(response => {
          this.$toast.error("sukses Hapus Keranjang", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true
          });
          console.log(response);
          //Update data
          axios
            .get("http://localhost:3000/keranjangs")
            .then(response => {
              this.setKeranjang(response.data);
            })
            .catch(error => {
              console.log("Gagal : ", error);
            });
        })
        .catch(error => {
          console.log("Gagal : ", error);
        });
    },
    Checkout() {
      if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.keranjang = this.keranjang;
        axios
          .post("http://localhost:3000/pesanans",this.pesan)
          .then(() => {
              // hapus Semua Keranjang
              this.keranjang.map((item)=>{
                return axios
                  .delete("http://localhost:3000/keranjangs/"+item.id)
                  .catch((error)=>{console.log(error);})
              })
              this.$router.push({ path:"/pesanan-sukses"})
              this.$toast.success('Sukses Dipesan', {
                type:"success",
                position:"top-right",
                duration:3000,
                dismissible:true
            })
          })
          .catch(error => {
            console.log("Gagal SS : ", error);
          });
      }else {
        this.$toast.error("Nama dan No meja Harus di isi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true
        });
      }
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/keranjangs")
      .then(response => {
        this.setKeranjang(response.data);
      })
      .catch(error => {
        console.log("Gagal : ", error);
      });
  },
  computed: {
    totalHarga() {
      return this.keranjang.reduce(function(items, data) {
        return items + data.products.harga * data.jumlah_pemesanan;
      }, 0);
    }
  }
};
</script>

<style>
</style>