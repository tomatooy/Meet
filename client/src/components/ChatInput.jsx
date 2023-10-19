import React,{useState,useEffect,useRef} from 'react'
import { useSelector } from 'react-redux';
import { useTheme,Typography} from '@mui/material';
import io from "socket.io-client"

const URL = process.env.NODE_ENV === 'production' ? process.env.REACT.USER.API : "http://localhost:3001"

export default function ChatInput(props) {
    const {updateMessages,currMessages} = props
    const [inputMessage,setInputMessage] = useState("");
    const {receiver,sender} = useSelector((state)=>state.message)
    const theme = useTheme()
    const socket = useRef()
    useEffect(() => {
        socket.current = io(URL)
        return ()=>{socket.current.disconnect()}
    }, []);
    
    const sendMessage = (e) => {
        e.preventDefault()
        socket.current.emit('chat_message', { message: inputMessage, receiver:receiver.id,sender:sender,users:[receiver.id,sender]});
        updateMessages([...currMessages,{fromSelf:true,message: inputMessage}])
        setInputMessage("")
    };

    return (
        <form  onSubmit={(e)=>sendMessage(e)} style={theme.message.inputArea}>
            <input type="text" placeholder="Say Hi!" value = {inputMessage} onChange={(e)=>{setInputMessage(e.target.value)}} 
            style={{width:"90%",height:"100%",border:"2px solid #f7f7f7", outline: "none"}}></input>
            <button type="submit" style={theme.message.inputButton} > <Typography>Send</Typography> </button>
        </form>
    )
}
