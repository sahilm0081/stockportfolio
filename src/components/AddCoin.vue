<template>
  <div class="row">
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Coin Name</label>
        <select class="form-select" v-model="form.name">
          <option value="">-Select Coin-</option>
          <option v-for="coin in coin_list" :key="coin.name" :value="coin.name">
            {{ coin.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Bought Price</label>
        <input type="textbox" class="form-control" v-model="form.price" />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Quantity</label>
        <input type="textbox" class="form-control" v-model="form.quantity" />
      </div>

      <button type="button" class="btn btn-primary" @click.prevent="submitData">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import firebase from "../firebase";
import requestMixins from "../request";

export default {
  mixins: [requestMixins],
  data() {
    return {
      form: {
        name: "",
        price: 0,
        quantity: 0,
      },
      coin_url: "https://api.smartviewai.com/api/Exchange/GetAllSymbols",
      coin_list: [],
    };
  },
  created() {
    this.fetchCoinList();
  },
  methods: {
    async fetchCoinList() {
      const data = await this.getRequest(this.coin_url);
      this.coin_list = data.data.data;
    },
    submitData() {
      const db = firebase.database().ref("/coins");
      db.push(this.form)
        .then(() => {
          alert("Added!");
        })
        .catch((error) => {
          alert("error");
          console.error("Error writing document: ", error);
        });
    },
  },
};
</script>

