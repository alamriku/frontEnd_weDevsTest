<template>
  <b-container >
    <div class="row justify-content-center">

      <div v-if="totalRows" class="col-8">
        <div class="overflow-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
          <b-table striped hover
                   :items="items"
                   :fields="fields"
                   :per-page="perPage"
                   :current-page="currentPage"
                   small
                   id="my-table"
          >
            <template #cell(image)="row">
              <b-img v-bind="mainProps" :src="getImageUrl(row.item.image)" rounded  alt="Fluid-grow image"></b-img>
            </template>
            <template #cell(actions)="row">
              <b-button size="md" :to="{ name: 'edit-product', params: { id: row.item.id } }" class="mr-1">
                Edit
              </b-button>
              <b-button size="md" @click="destroy(row.item.id)" class="mr-1">
                Delete
              </b-button>
            </template>
          </b-table>
        </div>
      </div>
      <div v-else class="col-8">
        <b-card bg-variant="dark" text-variant="white" title="Welcome">
          <b-card-text>
            No Data Found, please add some data
          </b-card-text>
          <b-button to="add-product" variant="primary">Go here</b-button>
        </b-card>
      </div>

    </div>
  </b-container>
</template>

<script>

import cookies from 'js-cookie'
export default {
  data () {
    return {
      perPage: 5,
      currentPage: 1,
      mainProps: { width: 75, height: 75, class: 'm1' }

    }
  },
  methods: {
    async destroy (product) {
      await this.tokenChecker()
      await this.$store.dispatch('deleteProduct', product)
      const index = this.items.findIndex(items => items.id === product)
      this.items.splice(index, 1)
      this.$toasted.show('Successfully Deleted', {
        theme: 'bubble',
        position: 'top-right',
        duration: 1500
      })
    },
    getImageUrl (productImage) {
      return process.env.VUE_APP_URL + productImage
    },
    async tokenChecker () {
      const token = cookies.get('x-access-token')
      if (!token) {
        await this.$store.dispatch('refreshToken')
      }
    }
  },
  computed: {
    fields () {
      return ['title', 'description', 'price', 'image', 'actions']
    },
    items () {
      return this.$store.getters.isProductList
    },
    totalRows () {
      return this.$store.getters.isProductList ? this.$store.getters.isProductList.length : 0
    }
  },
  async beforeMount () {
    await this.tokenChecker()
    await this.$store.dispatch('products')
  }
}
</script>
