import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Store/Store";
import { Delete, edit } from "../../../Store/listsSlice";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
    return <>
        
           
                {/* <>
                <input value={sent.picture} className="picture" onChange={onChangeHandler}/><br/>
                <input value={sent.name} className="name" onChange={onChangeHandler}/><br/>
                <input value={sent.email} className="email" onChange={onChangeHandler}/>
                <input value={sent.number} className="number" onChange={onChangeHandler}/><br/>
                <button className="buttons" onClick={onDeleteHandler}>Delete</button>
                <button className="buttons" onClick={onUpdateHandler}>Update</button>
                </> */}
                <Card style={{ width: '22rem'}}>
                    <Card.Img className="cardImage" variant="top" src={picture} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>EMAIL: {email}</ListGroup.Item>
                        <ListGroup.Item>PHONE:{number}</ListGroup.Item>
                        <ListGroup.Item><Button variant="secondary" size="sm" onClick={onDeleteHandler}>Delete</Button></ListGroup.Item>
                    </ListGroup>
                </Card>
                
                
                {/* <br/>
                <img className="image" src={picture}/><br/><br/>
                <span className="name">{name}</span><br/>
                <span className="information">{email}</span>
                <span className="information">{number}</span><br/><br/> */}
                {/* <button className="buttons" onClick={onDeleteHandler}>Delete</button> */}
                {/* <Button variant="primary" onClick={onDeleteHandler}>Delete</Button>
                <br/>
                <br/> */}
                {/* <button className="buttons" onClick={onEditHandler}>Edit</button> */}
                
                
        

    </>
}