import {ref} from '@vue/composition-api';

const state = ref({
    connection: null,
    messages: [],
    allMembers: []
})
//TODO decouple members from websocket module
const methods = {
    setAllMembers: members => {
        state.value.allMembers = members;
    },
    setupWebsocket: wssToken => {
        state.value.connection = new WebSocket(`wss://ga9hkj72e2.execute-api.us-east-1.amazonaws.com/standup?authorization=${wssToken}`);
        state.value.connection.onmessage = event =>  {
          state.value.messages.unshift(event);
        }
        state.value.connection.onopen = () => {
          console.log("Successfully connected to the websocket server...")
        }
        state.value.connection.onclose = () => {
          alert("Websocket connection closed. Refresh your browser to continue to recieve live updates.")
        }
    }
}

export default {
    state,
    methods,
}