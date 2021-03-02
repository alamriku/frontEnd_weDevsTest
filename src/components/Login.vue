<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <p v-if="loading">Loading...</p>
      <b-col cols="6">
        <b-form @submit.prevent="login">
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
        email: null,
        password: null
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async login () {
      this.error = null
      try {
        this.loading = true
        await this.$store.dispatch('login', this.form)
        await this.$router.push({ name: 'home' })
      } catch (e) {
        console.log(e.response)
        if (e.response.status === 422) {
          const { data } = e.response
          this.error = data.errors
          this.$toasted.error(data.errors, {
            theme: 'bubble',
            position: 'top-right',
            duration: 2500
          })
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
