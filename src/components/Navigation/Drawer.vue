<template>
    <v-navigation-drawer 
        app 
        v-model="state.drawerStatus" 
    >
        <v-list-item class="px-2 py-1">
            <v-list-item-avatar>
            <img src="https://cdn.thepennyhoarder.com/wp-content/themes/pennyhoarder/assets/images/abeicon.svg"/>
            </v-list-item-avatar>
            <v-list-item-title>Daily Standup</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon>face</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>Anonymous User</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

    <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
              <v-icon>groups</v-icon>
            <v-list-item-title class="ml-3">Standup</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import {inject} from '@vue/composition-api'

export default {
    setup() {
        const {navigation} = inject('store')

        return {state: navigation.state}
    }
}
</script>