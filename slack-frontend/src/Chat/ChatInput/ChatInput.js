import React, { useState } from 'react';
import firebase from 'firebase'
import { useStateValue } from '../../StateProvider';
import './ChatInput.css';
import axios from '../../axios';

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState("");
    const [{ user }] = useStateValue();
    
    const sendMessage = (e) => {
        e.preventDefault();

        if (channelId) {
            axios.post(`/new/mesage?id=${channelId}`, {
                message: input,
                timestamp: Date.now(),
                user: user.displayName,
                userImage: user.photoURL
            })
        }
        setInput("");
    }

    return (
        <div className='chatInput'>
            <form>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName?.toLowerCase()}`}
                />
                <button type="sumbit" onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput
