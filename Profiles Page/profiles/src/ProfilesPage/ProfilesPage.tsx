import React from 'react';
import AddProfile from './Childs/AddProfile';
import ProfileList from './Childs/ProfileList';

export default function ProfilesPage(){

    return (
        <>
        <div className='Profiles'>
            Profiles
        </div>
        <div className ="page">
            <div className='AddProfile'>
                <AddProfile/>
            </div>
            <div className='ProfileList'>
                <ProfileList/>
            </div>
        </div>
        </>
    )
}