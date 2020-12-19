<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col cols="8">
          <b-form @submit.prevent="onSubmit" @reset="onReset" enctype="multipart/form-data">
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
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import axios from '../axiosAuth'
export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        price: '',
        image: '',
        id: ''
      },
      mainProps: { width: 75, height: 75, class: 'm1' },
      dbImage: ''
    }
  },
  methods: {
    onSubmit (event) {
      this.$store.dispatch('updateProduct', this.form)
    },
    getImageUrl (productImage) {
      return process.env.VUE_APP_URL + productImage
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.title = ''
      this.form.description = ''
      this.form.price = ''
      this.form.image = ''
    },
    handleFileUpload (e) {
      console.log(e.target.files[0].size)
      if (e.target.files[0].size) {
        const selectedImage = e.target.files[0]
        this.createBase64Image(selectedImage)
      }
    },
    createBase64Image (fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.form.image = e.target.result
      }
      reader.readAsDataURL(fileObject)
    },
    setData (data) {
      this.form.title = data.title
      this.form.description = data.description
      this.form.price = data.price
      this.dbImage = data.image
      this.form.id = data.id
    }
  },
  created () {
    const id = this.$route.params.id
    axios.get('api/v1/products/' + id, {
      headers: {
        Authorization: 'Bearer' + localStorage.getItem('idToken')
      }
    }).then(res => {
      this.setData(res.data.product)
    }).catch(err => {
      console.log(err)
    })
  }
  // computed: {
  //   item () {
  //     const data = this.$store.getters.product
  //     this.setData(this.$store.getters.product)
  //     return data
  //   }
  // }
}
</script>
