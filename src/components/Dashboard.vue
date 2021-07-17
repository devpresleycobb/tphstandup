<template>
  <v-container>
    <drawer></drawer>
    <navigation-header></navigation-header>
    <v-main>
      <v-progress-circular
      indeterminate
      color="primary"
      v-if="loading"
      class="ma-auto"
    ></v-progress-circular>
    <v-container v-else >
      <v-container class="d-flex justify-center">
        <member-list :status="false"></member-list>
        <member-list :status="true"></member-list>
      </v-container>
    </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
    
  </v-container>
</template>


<script>
  import { inject, onMounted, watch, ref } from '@vue/composition-api';
  import MemberList from './MemberList';
  import Drawer from './Navigation/Drawer';
  import NavigationHeader from './Navigation/NavigationHeader.vue';
  import axios from 'axios';
  export default {
    components: {
      MemberList,
      Drawer,
      NavigationHeader,
    },
    setup() {
      const { websocket, members } = inject('store');
      const loading = ref(true);
      onMounted(async () => {
        // const token = auth.state.value.session.idToken.jwtToken;
        // let config = {
        //   headers: {
        //     'X-Api-Key': 'H9cqo6VCkz6oMWk1PIAf98ygUA5j8qnp38nlwtVM',
        //     Authorization: token,
        //   }
        // }
        // const wssToken = await auth.methods.getWSSAuthToken(config);
        // const {data: {results: standupMembers}} = await axios.get('https://9r95b93xyd.execute-api.us-east-1.amazonaws.com/manager', config);
        // websocket.methods.setupWebsocket(wssToken);
        // members.methods.setAllMembers(standupMembers);
        loading.value = false;
        })
        watch(websocket.state.value.messages, messages => {
           const data = JSON.parse(messages[0].data);
           if (data.type !== 'standup') return;
           const updatedMembers = members.state.value.allMembers.map(member => {
             if(member.id === data.id) {
               member.status = data.status
               return member;
             }
             return member;
           })
           members.methods.setAllMembers(updatedMembers);
        })
        return {loading}
    }
  }
</script>