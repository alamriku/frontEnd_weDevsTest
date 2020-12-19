<template>
  <div>
    <b-table striped hover
             :items="items"
             :fields="fields"
             small
    >
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
  methods: {
    destroy (product) {
      this.$store.dispatch('deleteProduct', product)
    }
  },
  computed: {
    fields () {
      return ['title', 'description', 'price', 'actions']
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
