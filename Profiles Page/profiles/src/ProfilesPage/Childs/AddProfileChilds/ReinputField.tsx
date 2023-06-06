import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

interface IProps{
    field: String
    setter: React.Dispatch<React.SetStateAction<{
        picture: string;
        name: string;
        email: string;
        number: string;
    }>>
    type?: string;
    name: string;
}

export default function ReinputField({field, setter, type, name}: IProps){

    return <>
        <FloatingLabel controlId="floatingInput" label={field} className="mb-3">
            <Form.Control type={type} placeholder={name} onChange={e => {
                if(field === 'Profile Picture'){
                    setter(data => {return {...data, picture: e.target.value}})
                }
                else if(field === 'Name'){
                    setter(data => {return {...data, name: e.target.value}})
                }
                else if(field === 'Email'){
                    setter(data => {return {...data, email: e.target.value}})
                }
                else{
                    setter(data => {return {...data, number: e.target.value}})
                }
            }}/>    
        </FloatingLabel>
    </>
    
// <form>
    //     <div className='form-floating'>
    //         <input className="form-control" placeholder={name} onChange={e => {
    //             if(field === 'Profile Picture'){
    //                 setter(data => {return {...data, picture: e.target.value}})
    //             }
    //             else if(field === 'Name'){
    //                 setter(data => {return {...data, name: e.target.value}})
    //             }
    //             else if(field === 'Email'){
    //                 setter(data => {return {...data, email: e.target.value}})
    //             }
    //             else{
    //                 setter(data => {return {...data, number: e.target.value}})
    //             }
    //         }}/>
    //         <label className=''>{field}</label><br/>
    //         <br/>
    //     </div>
    // </form>
}