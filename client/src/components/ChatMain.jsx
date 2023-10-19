import React, { useState, useEffect, useRef } from 'react'
import ChatInput from './ChatInput';
import { Box, useTheme, Typography, Container } from "@mui/material";
import io from "socket.io-client"
import { useSelector } from 'react-redux';
import axios from 'axios';
import UserImage from "./UserImage";
const URL = process.env.NODE_ENV === 'production' ? process.env.REACT.USER.API : "http://localhost:3001"
export default function ChatMain() {
    const theme = useTheme()
    const [arrivalMessage, setArrivalMessage] = useState()
    const from = useSelector(state => state.auth.user._id)
    const to = useSelector(state => state.message.receiver.id)
    const receiverIcon = useSelector(state => state.message.receiver.icon)
    const userIcon = useSelector(state => state.auth.user.picturePath)
    const chatName = useSelector(state => state.message.receiver.name)
    const [messages, updateMessages] = useState([])
    const socket = useRef()
    const messagesArea = useRef()
    const main = theme.palette.neutral.main;


    useEffect(() => {
        arrivalMessage && updateMessages([...messages, arrivalMessage]);
    }, [arrivalMessage]);


    useEffect(() => {
        fetchMessages().then((messages) => { updateMessages(messages) });

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
        socket.current = io(URL);
        if (socket.current) {
            socket.current.on(from, (data) => {
                setArrivalMessage({ fromSelf: false, message: data.message });
            });
        }
        return () => { socket.current.disconnect(); }
    }, []);

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
            <Box style={theme.message.messageArea} className="messages" sx={{ backgroudColor: "transparent",padding:"0 10px" }} ref={messagesArea}>
                <Typography
                    color={main}
                    variant="h5"
                    fontWeight="500"
                    sx={{ textAlign: "center", position: "sticky", top: "0", zIndex: '2', backgroundColor: "inherit" }}
                >
                    {chatName}
                </Typography>

                {
                    
                    processMessages().map((e)=>{
                        return e;
                    })
                }


            </Box>
            <Box sx={{ height: "10%" }}>
                <ChatInput currMessages={messages} updateMessages={updateMessages} style={theme.message.inputArea} />
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
            while(i < messages.length) {
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
