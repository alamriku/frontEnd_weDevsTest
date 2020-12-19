<template>
  <div>
    <b-table striped hover
             :items="items"
             :fields="fields"
             small
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
</template>

<script>
export default {
  data () {
    return {
      mainProps: { width: 75, height: 75, class: 'm1' }
    }
  },
  methods: {
    destroy (product) {
      this.$store.dispatch('deleteProduct', product)
    },
    getImageUrl (productImage) {
      console.log(process.env.VUE_APP_URL + productImage)
      return process.env.VUE_APP_URL + productImage
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
      return this.items.length
    }
  },
  created () {
    this.$store.dispatch('products')
  }
}
</script>
