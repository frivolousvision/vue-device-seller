<template>
  <div class="container mt-5">
    <div class="card ms-auto me-auto p-3 shadow-lg custom-card">
      <font-awesome-icon
        icon="user-circle"
        class="ms-auto me-auto user-icon"
      ></font-awesome-icon>
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <form
        @submit.prevent="handleRegister"
        novalidate
        :class="submitted ? 'was-validated' : null"
      >
        <div class="form-group">
          <label for="name">Full Name</label
          ><input
            v-model="formData.name"
            type="text"
            id="name"
            class="form-control"
            name="name"
            placeholder="Full Name"
            required
          />
          <div class="invalid-feedback">Full name is required.</div>
        </div>
        <div class="form-group">
          <label for="username">Username</label
          ><input
            v-model="formData.username"
            type="text"
            id="username"
            class="form-control"
            name="username"
            placeholder="Username"
            required
          />
          <div class="invalid-feedback">Username is required.</div>
        </div>
        <div class="form-group">
          <label for="passwod">Password</label
          ><input
            v-model="formData.password"
            type="text"
            id="password"
            class="form-control"
            name="password"
            placeholder="Password"
            required
          />
          <div class="invalid-feedback">Password is required.</div>
        </div>

        <button
          class="btn btn-success w-100 mt-3"
          @click="submitted = true"
          :disabled="loading"
        >
          Sign Up
        </button>
      </form>
      <router-link to="/login" class="btn btn-link" style="color: darkgray"
        >I have an account.</router-link
      >
    </div>
  </div>
</template>
<script>
import User from "@/models/user";
import AuthenticationService from "@/services/authentication.service";
import vuex from "vuex";

export default {
  name: "register",
  data() {
    return {
      formData: new User(),
      loading: false,
      submitted: false,
      errorMessage: "",
    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),
  },
  mounted() {
    //session-user
    if (this.currentUser?.username) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      if (
        !this.formData.username ||
        !this.formData.password ||
        !this.formData.name
      ) {
        return;
      }
      this.loading = true;

      AuthenticationService.register(this.formData)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.status === 409) {
            this.errorMessage = "Username is not valid";
          } else {
            this.errorMessage = "Unexpected error occurred";
          }
        })
        .then(() => (this.loading = false));
    },
  },
};
</script>
<style scoped></style>
