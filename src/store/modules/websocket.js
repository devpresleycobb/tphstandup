import {ref} from '@vue/composition-api';

const state = ref({
    connection: null,
    messages: [],
    allMembers: []
})

const methods = {
    setAllMembers: members => {
        state.value.allMembers = members;
    },
    setupWebsocket: wssToken => {
        state.value.connection = new WebSocket(`wss://ga9hkj72e2.execute-api.us-east-1.amazonaws.com/standup?authorization=${wssToken}`);
        state.value.connection.onmessage = event =>  {
          state.value.messages.unshift(event);
          console.log('got message',event);
        }
        state.value.connection.onopen = event => {
          console.log(event)
          console.log("Successfully connected to the websocket server...")
        }
        state.value.connection.onclose = event => {
          console.log(event)
          console.log("Websocket connection closed")
        }
    }
}

export default {
    state,
    methods,
}