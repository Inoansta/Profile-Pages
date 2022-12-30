import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Store/Store";
import { Delete, edit } from "../../../Store/listsSlice";

interface IProps{
    name: string
    picture: string
    email: string
    number: string
    index: number
}

export default function ProfileCard ({name, picture, email, number, index}: IProps){
    const [flag, flagSetter] = useState(-1);
    const [sent, sentSetter] = useState({
        name: name,
        picture: picture,
        email: email,
        number: number
    })

    const dispatch = useDispatch();
    const onDeleteHandler= ()=>{
        dispatch(
            Delete(index)
        )
        return;
    }

    const onEditHandler= ()=>{
        flagSetter(index);
    }

    const onUpdateHandler= ()=>{
        dispatch(
            edit({
                index: index,
                information: sent
            })
        )
        flagSetter(-1);
    }

    const onChangeHandler = (e:any)=>{
        sentSetter(data => {return {...data, [e.target.className]: e.target.value}})
    }
    return <div className="Card">
        {
            flag === index ? (
                <>
                <input value={sent.picture} className="picture" onChange={onChangeHandler}/><br/>
                <input value={sent.name} className="name" onChange={onChangeHandler}/><br/>
                <input value={sent.email} className="email" onChange={onChangeHandler}/>
                <input value={sent.number} className="number" onChange={onChangeHandler}/><br/>
                <button className="buttons" onClick={onDeleteHandler}>Delete</button>
                <button className="buttons" onClick={onUpdateHandler}>Update</button>
                </>
                ):(
                <>
                <img className="image" src={picture}/><br/>
                <span className="name">{name}</span><br/>
                <span className="information">{email}</span>
                <span className="information">{number}</span><br/>
                <button className="buttons" onClick={onDeleteHandler}>Delete</button>
                <button className="buttons" onClick={onEditHandler}>Edit</button>
                </>
                )
        }

    </div>
}