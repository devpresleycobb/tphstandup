<template>
  <v-container class="d-flex justify-center">
      <member-list :status="false"></member-list>
      <member-list :status="true"></member-list>
  </v-container>
</template>


<script>
  import { inject, onMounted, watch } from '@vue/composition-api';
  import MemberList from './MemberList';
  import axios from 'axios';
  export default {
    components: {
      MemberList,
    },
    setup() {
      const {websocket, auth, members} = inject('store');
      onMounted(async () => {
        const token = auth.state.value.session.idToken.jwtToken;
        let config = {
          headers: {
            Authorization: token,
          }
        }
        const wssToken = await auth.methods.getWSSAuthToken(config);
        const {data: {results: standupMembers}} = await axios.get('https://9r95b93xyd.execute-api.us-east-1.amazonaws.com/manager', config);
        websocket.methods.setupWebsocket(wssToken);
        members.methods.setAllMembers(standupMembers);
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
    }
  }
</script>