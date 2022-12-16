import React from 'react';
import AddProfile from './AddProfile';
import ProfileList from './ProfileList';

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