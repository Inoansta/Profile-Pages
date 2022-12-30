import React from 'react'

interface IProps{
    field: String
    setter: React.Dispatch<React.SetStateAction<{
        picture: string;
        name: string;
        email: string;
        number: string;
    }>>
}

export default function ReinputField({field, setter}: IProps){

    return <div>
        <label>{field}</label><br/>
        <input onChange={e => {
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
        <br/>
    </div>
}