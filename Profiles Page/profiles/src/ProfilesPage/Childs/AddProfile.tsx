import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../../Store/listsSlice';
import ReinputField from './AddProfileChilds/ReinputField';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


export default function AddProfile(){
    const [information, informationSetter] = useState({
        picture:'',
        name:'',
        email:'',
        number:''
    }); 

    const dispatch = useDispatch();
    return <>
    <div>Add Profile</div>
        <br/>
        <br/>
        <br/>
    <Container fluid="sm">
        <ReinputField field="Profile Picture" name="Image" setter={informationSetter}/>
        <ReinputField field="Name" type="text" name="Name" setter={informationSetter}/>
        <ReinputField field="Email" type="email" name="Eail" setter={informationSetter}/>
        <ReinputField field="Phone Number" type="tel" name="Number" setter={informationSetter}/>
        <Button variant="primary" onClick={()=>{
            dispatch(
                add(information)
            )
        }}>Submit</Button>{' '}
    </Container>

    </>
}