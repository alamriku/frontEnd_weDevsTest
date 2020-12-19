<template>
  <div v-if="auth">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/add-product">
            Add Product
          </b-nav-item>
          <b-nav-item to="/list-product">
            List Product
          </b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
<!--            <b-dropdown-item @click="onRefresh">Refresh</b-dropdown-item>-->
            <b-dropdown-item @click="onLogout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    },
    onRefresh () {
      this.$store.dispatch('refresh')
    }
  }
}
</script>
