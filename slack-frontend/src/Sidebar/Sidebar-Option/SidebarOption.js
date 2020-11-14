import React from 'react';
import { useHistory } from 'react-router-dom';
import './SidebarOption.css';
import axios from '../../axios';

function SidebarOption({ Icon, title, id, addChannelOption }) {
    const history = useHistory();

    const selectChannel = () => {
        if(id) {
            history.push(`/room/${id}`);
        } else {
            history.push('title');
        }
    }

    const addChannel = () => {
        const channelName = prompt('please enter the Channel Name');

        if (channelName) {
            axios.post('/new/channel', {
                channelName: channelName,
            })
        }
    }

    return (
        <div className='sidebarOption' onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon className='sidebarOption__icon' />}
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                    <h3 className="sidebarOption__channel">
                        <span className="sidebarOption__hash"> # </span> {title}
                    </h3>
                )}
        </div>
    )
}

export default SidebarOption
