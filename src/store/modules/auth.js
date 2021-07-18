import { CognitoUserPool } from "amazon-cognito-identity-js";
import { ref  } from "@vue/composition-api";
import axios from "axios";

const state = ref({
    poolData: {
        ClientId: '4f43mdlki0nt4nefsg33hn1m',
        UserPoolId: 'us-east-1_BGnjNGMC5',
    },
    username: '',
    password: '',
    session: null,
});

const methods = {
    getSession: async user => 
        new Promise((resolve, reject) => {
            if(!user) reject('User is invalid');
            user.getSession((err, session) => {
                if(err) {
                    resolve(null);
                } else {
                    resolve(session);
                }
            });
        }),
    getWSSAuthToken: async config => {
        const response = await axios.get('https://9r95b93xyd.execute-api.us-east-1.amazonaws.com/manager/wss-token', config);
        return JSON.parse(response.data.body).token;

    },
    setSession: (payload) => {
        state.value.session = payload
    },
    getUserPool: async poolData => new CognitoUserPool(poolData),
    getCurrentUser: async userPool => await userPool.getCurrentUser(),
}

export default {
    state,
    methods,
}