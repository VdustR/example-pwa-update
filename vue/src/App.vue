<template>
  <v-app>
    <div>{{ date }}</div>
    <v-snackbar :value="Boolean(update)" :timeout="0">
      New content is available; please refresh.
      <v-btn color="pink" text @click="update" :disabled="refreshing">
        refresh
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { register } from 'register-service-worker';
export default {
  name: 'App',

  data: () => ({
    date: process.env.VUE_APP_DATE,
    update: null,
    refreshing: false,
  }),

  mounted() {
    register('/service-worker.js', {
      registrationOptions: { scope: './' },
      updated: registration => {
        this.update = () => {
          this.refreshing = true;
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          registration.update().then(() => window.location.reload());
        };
      },
    });
  },
};
</script>
