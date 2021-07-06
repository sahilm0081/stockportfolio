<template>
  <div class="row">
    <div class="col-lg-3 m-2" v-for="(coin, index) in filterList" :key="index">
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">{{ coin.name }}</h5>

          <a href="#" class="btn btn-primary"> {{ coin.price }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import requestMixins from "../request";
export default {
  mixins: [requestMixins],
  data() {
    return {
      coinlist: [],
      binance_api_url: "https://api.binance.com/api/v3/ticker/price?symbol=",
    };
  },
  created() {
    this.fetchCoins();
  },
  computed: {
    filterList() {
      return this.coinlist.reduce((seed, current) => {
        return Object.assign(seed, {
          [current.name]: current,
        });
      }, {});
    },
  },
  methods: {
    async fetchCurrentPrice(coinname) {
      const data = await this.getRequest(this.binance_api_url + coinname);
      return data;
    },
    fetchCoins() {
      const db = firebase.database().ref("/coins");
      db.on(
        "value",
        (snapshot) => {
          const response = snapshot.val();

          for (const key in snapshot.val()) {
            if (Object.hasOwnProperty.call(response, key)) {
              const element = response[key];

              this.fetchCurrentPrice(element.name).then((responsePrice) => {
                const coin_current_price = responsePrice.data.price;
                const obj = {
                  id: key,
                  name: element.name,
                  price: coin_current_price,
                };
                this.coinlist.push(obj);
              });
            }
          }
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.name);
        }
      );
    },
  },
};
</script>

