import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../../Store/listsSlice';
import ReinputField from './AddProfileChilds/ReinputField';


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
    <div>
        <ReinputField field="Profile Picture" setter={informationSetter}/>
        <br/>
        <ReinputField field="Name" setter={informationSetter}/>
        <br/>
        <ReinputField field="Email" setter={informationSetter}/>
        <br/>
        <ReinputField field="Phone Number" setter={informationSetter}/>
        <br/>
        <button onClick={()=>{
            dispatch(
                add(information)
            )
        }}>submit</button>
    </div>

    </>
}