<template>
    <v-app-bar app>
        <v-icon @click="toggleDrawer" v-if="!state.drawerStatus">menu</v-icon>
        <v-icon v-else @click="toggleDrawer">mdi-chevron-left</v-icon>
        <div class="ml-4">Dashboard</div>
    </v-app-bar>
</template>

<script>
import {inject} from '@vue/composition-api';

export default {
    setup() {
        const {navigation} = inject('store');
        const {
            toggleDrawer
        } = navigation.methods
        return {toggleDrawer, state: navigation.state}
    }    
}
</script>