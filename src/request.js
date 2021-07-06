/* const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
var func = async () => {
  let data = await CoinGeckoClient.ping();
  console.log(data);
}; */
import axios from "axios";

export default {
  methods: {
    /*    async postRequest(url, formData) {
            return new Promise((resolve, reject) => {
                axios
                    .post(url, formData, this.headerConfig)
                    .then(response => {
                        this.$store.commit("showLoader", false);
                        let responseData = response.data.data;
                        resolve(responseData);
                    })
                    .catch(err => {
                        this.$store.commit("showLoader", false);
                        const errData = err.response;
                        if (errData) {
                            this.$toast.error(errData.data.message);
                        }
                    });
            });
        }, */
    async getRequest(url) {
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            console.log(reject(err));
            console.log(err);
          });
      });
    },
  },
};
