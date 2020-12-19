<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col cols="6">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
            <b-form-input
              type="password"
              id="input-2"
              v-model="form.password"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      console.log(this.form)
      this.$store.dispatch('login', this.form)
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
    }
  }
}
</script>
