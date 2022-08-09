<template>
  <div class="login-page-wrapper">
    <b-form
      class="login-form"
      @submit="onSubmit"
      @reset="onReset"
      v-if="showForm"
    >
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

      <b-form-group
        id="input-group-2"
        label="Your Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Enter your Password"
          required
        ></b-form-input>
      </b-form-group>

      <h4 class="sign-up-title">
        <router-link class="sign-up-link" to="/register">
          Still don't have an account?
          <br />
          Sign up.
        </router-link>
      </h4>
      <div class="action-btns mt-4">
        <b-button type="submit" variant="warning">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
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
        email: "",
        password: "",
      },
      showForm: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch('login', {
        email: this.form.email,
        password: this.form.password
      })
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.showForm = false;
      this.$nextTick(() => {
        this.showForm = true;
      });
    },
  },
};
</script>

<style scoped>
  .login-page-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 91vh;
    width: 100%;
    background: rgb(243, 233, 206);
  }
  .login-form {
    font-family: "Indie Flower", cursive;
    margin-top: 50px;
  }
  #input-1,
  #input-2 {
    width: 300px;
  }
  .sign-up-title {
    text-align: center;
    font-weight: 15px;
  }
  .sign-up-link {
    font-family: "Indie Flower", cursive;
    font-weight: bold;
    color: rgb(54, 54, 54) !important;
  }
</style>
