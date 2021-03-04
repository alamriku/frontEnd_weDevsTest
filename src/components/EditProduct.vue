<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col cols="8">
          <p v-if="report">loading...</p>
          <div v-if="error">
            <div v-for="er in error" v-bind:key="er.index">
              <b-alert show dismissible>
                {{ er[0] }} <b>&rArr;</b>
              </b-alert>
            </div>
          </div>
          <b-form @submit.prevent="onSubmit"  enctype="multipart/form-data">
            <b-form-group
              id="input-group-1"
              label="Title"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.title"
                placeholder="Enter Title"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Description" label-for="input-2">
              <b-form-textarea
                id="textarea"
                v-model="form.description"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-3" label="Price" label-for="input-3">
              <b-form-input
                id="input-1"
                v-model="form.price"
                placeholder="Enter Price"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Image" label-for="input-3">
              <b-form-file
                v-on:change="handleFileUpload"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
            <b-form-group>
              <b-img v-bind="mainProps" :src="getImageUrl(dbImage)" rounded alt="Rounded image"></b-img>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import cookies from 'js-cookie'
export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        price: '',
        image: null,
        id: ''
      },
      mainProps: { width: 75, height: 75, class: 'm1' },
      dbImage: null,
      error: null,
      report: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.tokenChecker()
        this.report = true
        const formMultiData = this.formData()
        const dataObject = { id: this.form.id, editForm: formMultiData }
        await this.$store.dispatch('updateProduct', dataObject)
        this.$toasted.show('Successfully Updated', {
          theme: 'bubble',
          position: 'top-right',
          duration: 1500
        })
        this.$router.push({ name: 'list-product' })
      } catch (e) {
        this.error = null
        const { data } = await e.response
        this.error = data.errors
      } finally {
        this.report = false
      }
    },
    getImageUrl (productImage) {
      return process.env.VUE_APP_URL + productImage
    },
    formData () {
      const formEntry = new FormData()
      formEntry.append('_method', 'patch')
      if (this.form.image != null) {
        formEntry.append('image', this.form.image)
      }
      if (this.dbImage != null) {
        formEntry.append('dbImage', this.dbImage)
      }
      formEntry.append('title', this.form.title)
      formEntry.append('description', this.form.description)
      formEntry.append('price', this.form.price)
      formEntry.append('id', this.form.id)
      console.log(...formEntry.entries())
      return formEntry
    },
    handleFileUpload (e) {
      this.form.image = e.target.files[0]
    },
    setData (data) {
      this.form.title = data.title
      this.form.description = data.description
      this.form.price = data.price
      this.dbImage = data.image
      this.form.id = data.id
    },
    async getProduct () {
      const id = this.$route.params.id
      await this.$store.dispatch('editProduct', id)
      const product = await this.$store.getters.product
      this.setData(product)
    },
    async tokenChecker () {
      const token = cookies.get('x-access-token')
      if (!token) {
        await this.$store.dispatch('refreshToken')
      }
    }
  },
  beforeMount () {
    this.getProduct()
  }
}
</script>
