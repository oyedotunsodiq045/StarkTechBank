<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title class="headline text-uppercase">
          <v-btn to="" text>
            <span>StarkTechBank</span>
          </v-btn>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn href="" target="" text>
        <span class="mr-2">Login/Register</span> -->
      <!-- <v-icon>mdi-open-in-new</v-icon> -->
      <!-- </v-btn> -->
    </v-app-bar>

    <v-main>
      <Login />
    </v-main>
  </v-app>
</template>

<script>
import Login from "./components/Login";

export default {
  name: "App",

  components: {
    Login,
  },

  data: () => ({
    //
  }),
};
</script>
