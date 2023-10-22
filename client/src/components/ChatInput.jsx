import React,{useState,useContext} from 'react'
import {SocketContext} from 'context/socket';
import { useSelector,useDispatch } from 'react-redux';
import { useTheme,Typography} from '@mui/material';
import { setLatestMessage } from 'state/notification';



export default function ChatInput({updateMessages,currMessages}) {
    const socket = useContext(SocketContext);
    const [inputMessage,setInputMessage] = useState("");
    const {receiver,sender} = useSelector((state)=>state.message)
    const theme = useTheme()
    const dispatch = useDispatch()
    const sendMessage = (e) => {
        console.log(socket)
        e.preventDefault()
        if(socket){
        socket.emit('chat_message', { message: inputMessage, receiver:receiver.id,sender:sender,users:[receiver.id,sender]});
        updateMessages([...currMessages,{fromSelf:true,message: inputMessage}])
        dispatch(setLatestMessage({id:receiver.id,message:inputMessage}))
        setInputMessage("")}
        else{
            throw Error("No connection")
        }
    };

    return (
        <form  onSubmit={(e)=>sendMessage(e)} style={theme.message.inputArea}>
            <input type="text" placeholder="Say Hi!" value = {inputMessage} onChange={(e)=>{setInputMessage(e.target.value)}} 
            style={{width:"90%",height:"100%",border:"2px solid #f7f7f7", outline: "none"}} disabled={!receiver.id}></input>
            <button type="submit" style={theme.message.inputButton} disabled={!receiver.id}> <Typography>Send</Typography> </button>
        </form>
    )
}
