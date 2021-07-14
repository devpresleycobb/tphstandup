import { ref } from '@vue/composition-api';

const state = ref({
    allMembers: []
})

const methods = {
    setAllMembers: members => {
        state.value.allMembers = members.slice()
    }
}

export default {
    state,
    methods,
}