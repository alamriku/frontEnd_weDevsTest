<template>
  <div v-if="authenticated">
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
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      authenticated: 'authenticated'
    })
  },
  methods: {
    async logout () {
      this.loading = true
      try {
        await this.$store.dispatch('getout')
        await this.$store.dispatch('logout')
        this.$router.push({ name: 'login' })
      } catch (e) {
        this.error = e
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
