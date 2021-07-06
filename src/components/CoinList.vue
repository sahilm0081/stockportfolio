<template>
  <div class="col-lg-10 mt-4">
    <button type="button" class="btn btn-primary m-4">
      Total Spent
      <span class="sr-only">{{ totalAmountSpent.toFixed(2) }}</span>
    </button>
    <button type="button" class="btn btn-info m-4">
      Total Remaining
      <span class="sr-only">{{ totalAmountRemaining.toFixed(2) }}</span>
    </button>
    <template v-if="totalprofitloss > 0">
      <button type="button" class="btn btn-success m-4">
        Total Profit Loss
        <span class="sr-only">{{ totalprofitloss.toFixed(2) }}</span>
      </button>
    </template>
    <template v-else>
      <button type="button" class="btn btn-danger m-4">
        Total Profit Loss
        <span class="sr-only">{{ totalprofitloss.toFixed(2) }}</span>
      </button>
    </template>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Amount Spent ($)</th>
          <th scope="col">Current Value</th>
          <th scope="col">Current Price</th>
          <th scope="col">Average Price</th>
          <th scope="col">Profit/Loss (in dollars)</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="this.coinlist.length == 0">
          No coin added..
        </tr>
        <tr v-for="(coin, index) in sortList" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{ coin.name }}</td>
          <td>{{ coin.price }}</td>
          <td>{{ coin.quantity }}</td>
          <td>{{ coin.totalSpent }}</td>
          <td>{{ coin.amountRemaining }}</td>
          <td>{{ coin.current_price }}</td>
          <td>0</td>

          <td v-if="coin.profit_loss > 0" style="color: green">
            {{ coin.profit_loss }}
          </td>
          <td v-else style="color: red">
            {{ coin.profit_loss }}
          </td>
          <td>
            <a
              href="#"
              @click.prevent="deleteRow(coin.id)"
              class="btn btn-danger"
              >Delete</a
            >
          </td>
        </tr>
      </tbody>
    </table>
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
      totalAmountSpent: 0,
      totalAmountRemaining: 0,
      totalprofitloss: 0,
      binance_api_url: "https://api.binance.com/api/v3/ticker/price?symbol=",
    };
  },

  created() {
    this.fetchCoins();
  },
  computed: {
    sortList() {
      const coinlist = [...this.coinlist];
      return coinlist.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
  },
  methods: {
    deleteRow(id) {
      const db = firebase.database().ref("/coins");
      db.child(id).remove();
      window.location.reload();
    },
    averagePrice(coinname) {
      const coinlist = [...this.coinlist];
      var total_purchase_times = 0;
      var total_amount_spent = 0;
      var average_price = 0;
      coinlist.map((coin) => {
        if (coinname == coin.name) {
          total_purchase_times = total_purchase_times + 1;
          total_amount_spent = coin.totalSpent;
          average_price = total_amount_spent / total_purchase_times;
          coinlist.average_price = average_price;
          return coinlist;
        }
      });
    },
    async fetchCurrentPrice(coinname) {
      const data = await this.getRequest(this.binance_api_url + coinname);
      return data;
    },
    async fetchCoins() {
      const db = await firebase.database().ref("/coins");
      db.on(
        "value",
        (snapshot) => {
          const response = snapshot.val();
          var totalAmountSpent = 0;
          var totalAmountRemaining = 0;
          var totalprofitloss = 0;
          for (const key in snapshot.val()) {
            if (Object.hasOwnProperty.call(response, key)) {
              const element = response[key];
              const coin_buy_price = element.price;
              const coin_buy_quantity = element.quantity;
              this.fetchCurrentPrice(element.name).then((responsePrice) => {
                const coin_price = responsePrice.data.price;
                const current_price = parseFloat(coin_price).toFixed(2);
                const totalSpent = (coin_buy_price * coin_buy_quantity).toFixed(
                  2
                );
                const amountRemaining = (
                  coin_price * coin_buy_quantity
                ).toFixed(2);

                const profit_loss = (amountRemaining - totalSpent).toFixed(2);

                totalAmountSpent =
                  parseFloat(totalAmountSpent) + parseFloat(totalSpent);
                totalAmountRemaining =
                  parseFloat(totalAmountRemaining) +
                  parseFloat(amountRemaining);
                totalprofitloss =
                  parseFloat(totalprofitloss) + parseFloat(profit_loss);

                const obj = {
                  id: key,
                  name: element.name,
                  price: coin_buy_price,
                  quantity: coin_buy_quantity,
                  totalSpent: totalSpent,
                  amountRemaining: amountRemaining,
                  profit_loss: profit_loss,
                  current_price: current_price,
                };
                this.coinlist.push(obj);
                this.totalAmountSpent = totalAmountSpent;
                this.totalAmountRemaining = totalAmountRemaining;
                this.totalprofitloss = totalprofitloss;
              });
            }
          }
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.name);
        }
      );
    },
    /* amountRemaining(coinname, quantity) {
      const coinvalue = localStorage.getItem(coinname);
      return coinvalue * quantity;
    }, */
  },
};
</script>

<style>
</style>