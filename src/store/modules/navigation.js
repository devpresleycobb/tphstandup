import {ref} from '@vue/composition-api';

const state = ref({
    drawerStatus: true,
})

const methods = {
    toggleDrawer: () => {
        state.value.drawerStatus = !state.value.drawerStatus
    }
}

export default {
    state,
    methods,
}