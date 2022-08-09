<template>
  <div class="register-page-wrapper">
    <b-form class="register-form" @submit="onSubmit" @reset="onReset" v-if="showForm">
      <b-form-group id="input-group-3" label="Your Name:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="name"
          v-model="form.name"
          placeholder="Enter your Name"
          required
        ></b-form-input>
      </b-form-group>

       <b-form-group id="input-group-4" label="Your last Name:" label-for="input-4">
        <b-form-input
          id="input-4"
          type="name"
          v-model="form.lastName"
          placeholder="Enter your last Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
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
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Enter your Password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="warning">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
          name: '',
          lastName: ''
        },
        showForm: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.$store.dispatch('register', {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
          lastName: this.form.lastName
        })
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values
        this.form.email = '';
        this.form.password = '';
        this.form.name = '';
        this.form.lastName = '';
        // Trick to reset/clear native browser form validation state
        this.showForm = false;
        this.$nextTick(() => {
          this.showForm = true;
        })
      }
    }
  }
</script>

<style scoped>
  .register-page-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 91vh;
    width: 100%;
    background: rgb(243, 233, 206);
  }
  .register-form {
    font-family: 'Indie Flower', cursive;
    margin-top: 50px;
  }
  #input-1,
  #input-2 {
    width: 300px;
  }
</style>