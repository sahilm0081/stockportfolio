<template>
  <div id="app">
    <div class="container">
      <nav class="nav">
        <router-link class="nav-link active" aria-current="page" to="/"
          >Home</router-link
        >
        <router-link class="nav-link" to="/addcoin"
          >Add Coin in portfolio</router-link
        >
        <router-link class="nav-link" to="/coinlist">Coin List</router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
</script>

