import React, { useState, useEffect, useRef,useContext} from 'react'
import {SocketContext} from 'context/socket';
import ChatInput from './ChatInput';
import { Box, useTheme, Typography} from "@mui/material";
import { useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import UserImage from "./UserImage";
import { setLatestMessage } from 'state/notification';
const URL = process.env.NODE_ENV === 'production' ? process.env.REACT.USER.API : "http://localhost:3001"
export default function ChatMain() {
    const  dispatch = useDispatch()
    const socket = useContext(SocketContext);
    const theme = useTheme()
    const [arrivalMessage, setArrivalMessage] = useState()
    const from = useSelector(state => state.auth.user._id)
    const to = useSelector(state => state.message.receiver.id)
    const receiverIcon = useSelector(state => state.message.receiver.icon)
    const userIcon = useSelector(state => state.auth.user.picturePath)
    const chatName = useSelector(state => state.message.receiver.name)
    const [messages, updateMessages] = useState([])
    const messagesArea = useRef()
    const main = theme.palette.neutral.main;

    useEffect(() => {
        arrivalMessage && updateMessages([...messages, arrivalMessage]);
    }, [arrivalMessage]);


    useEffect(() => {
        if(to){
            fetchMessages().then((messages) => { updateMessages(messages) });
        }

        // socket.current = io(URL)
        // // socket.current.on(from, (message) => {
        // //     console.log(to === message.sender)
        // //     if (to === message.sender) {
        // //         updateMessages([...messages, { fromSelf: false, message: message.message }]);
        // //     }
        // // });
        // return () => { socket.current.disconnect() }
    }, [to])

    useEffect(() => {
        console.log("chat main render")
        if (socket) {
            socket.on(from, (data) => {
                if(data.sender === to)
                dispatch(setLatestMessage({id:to,message:data.message}))
                setArrivalMessage({ fromSelf: false, message: data.message });
            });
        }
        return ()=>{
            
        }
    });

    useEffect(() => {
        handleScrollToBottom()
    }, [messages])

    const handleScrollToBottom = () => {
        if (messagesArea.current) {
            messagesArea.current.scrollTop = messagesArea.current.scrollHeight;
        }

    }

    let prevSender = null;
    let count = 0;
    let prevDate = null;
    return (
        <Box sx={{ height: "100%", position: "relative" }}>
            <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                sx={{ textAlign: "center", position: "sticky", top: "0", zIndex: '2', backgroundColor: "white", padding: "10px",height:"40px"}}
            >
                {chatName} 
            </Typography>

            <Box style={theme.message.messageArea} className="messages" sx={{ backgroudColor: "transparent",padding: "10px" }} ref={messagesArea}>

                {
                    messages.length > 0 ?
                        processMessages().map((e) => {
                            return e;
                        }) : <Typography style={theme.message.dateBreak} color={theme.palette.primary.main}><h1>.....</h1><h1>Start Chatting!</h1></Typography>
                }


            </Box>
            <Box sx={{ height: "10%" }}>
                <ChatInput currMessages={messages} updateMessages={updateMessages} style={theme.message.inputArea} socket={socket}/>
            </Box>
        </Box>
    )


    async function fetchMessages() {
        const res = await axios.post(`${URL}/messageAPI/getMessages`, { from: from, to: to })
        return res.data;
    }
    function processMessages() {
        let result = [];
        if (messages) {
            let i = 0
            while (i < messages.length) {
                const line = messages[i]
                const { date } = line;
                const { fromSelf } = line;
                const isSameSender = prevSender === fromSelf && count < 3; //line and prev line from same user and less than 3 consecutive message NO ICON
                if (prevSender !== fromSelf) { //switched user
                    prevSender = fromSelf
                    count = 0;
                }
                if (isSameSender) { //increment count for same user
                    count++;
                } else if (count === 3) {
                    count = 0;
                }

                if (date !== prevDate) {
                    prevDate = date;
                    count = 3
                    result.push(<Typography style={theme.message.dateBreak} color={theme.palette.primary.main}>{date}</Typography>)
                    continue;
                }



                let returnEle
                if (fromSelf && isSameSender) {
                    returnEle =
                        <Box style={theme.message.liRight} sx={{ marginRight: "30px" }}>
                            <div style={theme.message.liRightText}>{line.message}</div>
                        </Box>
                }
                else if (fromSelf && !isSameSender) {
                    returnEle =
                        <Box style={theme.message.liRight}>
                            <div style={theme.message.liRightText}>{line.message}</div>
                            <UserImage image={userIcon} size="30px" />
                        </Box>
                }
                else if (!fromSelf && isSameSender) {
                    returnEle =
                        <Box style={theme.message.liLeft} sx={{ marginLeft: "30px" }}>
                            <div style={theme.message.liLeftText}>{line.message} </div>
                        </Box>
                }
                else {
                    returnEle =
                        <Box style={theme.message.liLeft}>
                            <UserImage image={receiverIcon} size="30px" />
                            <div style={theme.message.liLeftText}>{line.message}</div>
                        </Box>
                }
                i++;
                result.push(returnEle);
            }
        }
        return result;
    }
}
