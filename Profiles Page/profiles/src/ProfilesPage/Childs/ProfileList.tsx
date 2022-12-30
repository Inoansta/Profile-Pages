import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import ProfileCard from './ProfileListChilds/ProfileCard';

export default function ProfileList(){
    const lists = useSelector((state: RootState)=>{
        return state.lists.value;
    })
    return <>
    <div>Profile List</div>
    <br/>
                <br/>
                <br/>
    <div>
        {lists.map((item, index)=>{
            return (
                <div>
                    <ProfileCard name={item.name} picture={item.picture} email={item.email} number={item.number} index={index}/>
                </div>
            )
        })}
    </div>
    </>
}