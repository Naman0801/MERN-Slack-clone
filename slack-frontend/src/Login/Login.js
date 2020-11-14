import React from 'react';
import './Login.css';
import { Button } from "@material-ui/core";
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Login() {
    const [state, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(res => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: res.user
                })
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className='login'>
            <div className="login__container">
                <img
                    src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
                    alt="slack logo"
                />

                <h1>Sign in to Slack Clone with Firebase</h1>
                <p>lucifer.slack.com</p>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login
