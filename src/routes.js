import Index from "./components/Index.vue";
import AddCoin from "./components/AddCoin.vue";
import CoinList from "./components/CoinList.vue";

export const routes = [
  { path: "/", component: Index },
  { path: "/addcoin", component: AddCoin },
  { path: "/coinlist", component: CoinList },
];
