import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import ProfileCard from './ProfileListChilds/ProfileCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ProfileList(){
    const lists = useSelector((state: RootState)=>{
        return state.lists.value;
    })
    return <>
    <br/>
    <br/>
    <div className='text-white'><h1>MEMBERS</h1></div>
    <br/>
                <br/>
                <br/>
    <Row xs={1} md={2} className="g-4">
        {lists.map((item, index)=>{
            return (
                <Col key={index}>
                    <ProfileCard name={item.name} picture={item.picture} email={item.email} number={item.number} index={index}/>
                </Col>
            )
        })}
    </Row>
    </>
}