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
        @submit.prevent="handleLogin"
        novalidate
        :class="submitted ? 'was-validated' : null"
      >
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
          Sign In
        </button>
      </form>
      <router-link to="/register" class="btn btn-link" style="color: darkgray"
        >Create new account!</router-link
      >
    </div>
  </div>
</template>
<script>
import User from "@/models/user";
import AuthenticationService from "@/services/authentication.service";
//import vuex from "vuex"; **Import for Options API**
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "login",
  //Composition API
  setup() {
    const formData = ref(new User());
    const loading = ref(false);
    const submitted = ref(false);
    const errorMessage = ref("");

    const store = useStore();
    const router = useRouter();
    const { currentUser } = store.getters;

    onMounted(() => {
      if (currentUser?.username) {
        router.push("/profile");
      }
    })

    const handleLogin =()=> {
        if (!formData.value.username || !formData.value.password) {
          return;
        }

        loading.value = true;

        AuthenticationService.login(formData.value)
          .then((response) => {
            //updateUser in vuex
            store.dispatch("updateUser", response.data);
            router.push("/profile");
          })
          .catch((err) => {
            console.log(err);
            errorMessage.value = "Unexpected error occurred";
          })
          .then(() => (loading.value = false));
      };

    return {
      formData,
      loading,
      submitted,
      errorMessage,
      currentUser,
      handleLogin,
    };
  },
  /*
  //Options API
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
    ...vuex.mapActions(["updateUser"]),
    handleLogin() {
      if (!this.formData.username || !this.formData.password) {
        return;
      }

      this.loading = true;

      AuthenticationService.login(this.formData)
        .then((response) => {
          //updateUser in vuex
          this.updateUser(response.data);
          this.$router.push("/profile");
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = "Unexpected error occurred";
        })
        .then(() => (this.loading = false));
    },
  },
  */
};
</script>
<style scoped></style>
