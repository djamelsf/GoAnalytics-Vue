<template>
  <div id="app">
    <b-navbar
      toggleable="lg"
      type="dark"
      style="background-color: #424242"
      class="fix-top"
    >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <div class="menu">
          <b-navbar-nav>
            <b-navbar-brand href="/.">
              <img
                src="../assets/logo.png"
                class="d-inline-block align-top"
                alt="Kitten"
              />
            </b-navbar-brand>
            <b-nav-item to="/search" class="items">Dashboard</b-nav-item>
            <b-nav-item to="/search" class="items">News articles</b-nav-item>
            <b-nav-item to="/about" class="items">Comparison</b-nav-item>
          </b-navbar-nav>
        </div>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
<style lang="scss">
.fix-top {
  margin-top: -63px;
}
.menu {
  width: 100%;
  bottom: 0;
  display: flex;
  //align-items: center;
  flex-direction: column;
  text-align: center;
  //color: #fff;
  font-size: 1.6rem;
}

.dark .nav-link {
  color: #009879 !important;
}
img{
  width: 300px;
}
.items{
  color:black!important
}
</style>
