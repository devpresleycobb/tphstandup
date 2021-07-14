<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { provide} from '@vue/composition-api';
import store from './store';
export default {
  setup() {
    provide('store', store);
  },
};
</script>
