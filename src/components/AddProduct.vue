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
          <b-form @submit.prevent="onSubmit" @reset="onReset"  enctype="multipart/form-data">
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
                ref="inputImage"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
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
export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        price: '',
        image: null
      },
      report: false,
      error: null
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.report = true
        const formMultipart = this.dataAsFormData()
        console.log(...formMultipart.entries())
        await this.$store.dispatch('addProduct', formMultipart)
        this.$toasted.show('Successfully Added', {
          theme: 'bubble',
          position: 'top-right',
          duration: 1500
        })
        this.onReset()
      } catch (e) {
        this.error = null
        const { data } = await e.response
        this.error = data.errors
      } finally {
        this.report = false
      }
    },
    dataAsFormData () {
      const formData = new FormData()
      if (this.form.image != null) {
        console.log('test')
        formData.append('image', this.form.image)
      }
      formData.append('title', this.form.title)
      formData.append('description', this.form.description)
      formData.append('price', this.form.price)
      return formData
    },
    onReset () {
      // Reset our form values
      this.form.title = ''
      this.form.description = ''
      this.form.price = ''
      this.form.image = null
      this.$refs.inputImage.reset()
    },
    handleFileUpload (e) {
      this.form.image = e.target.files[0]
      // if (e.target.files[0].size) {
      //   const selectedImage = e.target.files[0]
      //   this.createBase64Image(selectedImage)
      // }
    },
    createBase64Image (fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.form.image = e.target.result
      }
      reader.readAsDataURL(fileObject)
    }
  }

}
</script>
