<template>
    <v-card
      width="250"
      class="mx-16"
    >
      <v-list three-line>
        <v-subheader>{{status ? 'Complete': 'Incomplete'}}</v-subheader>
        <draggable class="list-group" :list="members" group="members" @end="end">
                <div v-for="(member) in members" :key="member.id" :id="member.id">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img :src="member.avatar"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-html="member.name"></v-list-item-title>
                            <v-list-item-subtitle>{{member.title}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                </div>
        </draggable>
      </v-list>
    </v-card>
</template>

<script>
  import draggable from "vuedraggable";
  import {inject, computed} from '@vue/composition-api';
  import axios from 'axios';

  export default {
    setup(props) {
        const { auth, members } = inject('store');
        const end = event => {
            members.state.value.allMembers = members.state.value.allMembers.map(member => 
                member.id === event.item.id ? {...member, status: !props.status } : member
            );
            const token = auth.state.value.session.idToken.jwtToken;
            let config = {
                headers: {
                    Authorization: token,
                }
            }
            axios.patch('https://9r95b93xyd.execute-api.us-east-1.amazonaws.com/manager', {id: event.item.id, status: !props.status}, config);
        }
        const allMembers = computed(() => members.state.value.allMembers.filter(member => member.status === props.status))
        return { end, members: allMembers }
    },
    props: {
        status: {
            type: Boolean,
            required: true,
        }
    },
    components: {
        draggable
    },
  }
</script>

<style scoped>
.list-group {
    min-height: 100vh;
}
</style>