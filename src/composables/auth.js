import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { computed, ref  } from "@vue/composition-api";
import router from '../router';

const auth = () => {
    const poolData = computed(() => ({
            ClientId: process.env.CLIENT_ID,
            UserPoolId: process.env.USER_POOL_ID,
        })
    );
    let username = ref('');
    let password = ref('');
    let session = ref(null);
    const user = computed(() => new CognitoUser({
            Username: username.value,
            Pool: userPool.value,
        })
    );
    const userPool = computed(() => new CognitoUserPool(poolData.value))
    const getSession = async () => 
        await new Promise((resolve, reject) => {
            const user = userPool.value.getCurrentUser()
            if (user) {
                user.getSession((err, session) => {
                    if(err) {
                        resolve(null);
                    } else {
                        resolve(session);
                    }
                });
            } else {
                reject();
            }
        })
    const authenticateUser = event =>  {
        event.preventDefault();
        user.value.authenticateUser(authDetails.value, {
            onSuccess: (data) => {
                session.value = data;
                test.value = 'osuccess';
                router.push('dashboard');
            },
            onFailure: err => {
                console.log('onFailure:', err);
            },
            newPasswordRequired: data => {
                console.log('newPasswordRequired:', data);
            }
        });
    }
    const userPool = computed(() => new CognitoUserPool(state.poolData)),
    const authDetails = computed(() => new AuthenticationDetails({
            Username: username.value,
            Password: password.value,
    }))
    return { user, username, password, getSession, session, authenticateUser }
}

export default auth