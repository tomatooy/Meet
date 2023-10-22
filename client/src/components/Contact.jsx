import React, { useState, useEffect } from 'react'
import FlexBetween from "./FlexBetween";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "./UserImage";
import { setReceiver } from 'state/message';
import NotificationBadge from './NotificationBadge';
import {  setReadPersonMessage } from 'state/notification';


export default function Contact() {

    const friends = useSelector((state) => state.auth.user.friends);
    const currReciever = useSelector((state) => state.message.receiver.id);
    const contactUnread = useSelector((state) => state.notification.incomingMessages)
    const latestChat = useSelector((state)=>(state.notification.latestMessages))
    const [friendList, updateFriendList] = useState();
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const dispatch = useDispatch()
    useEffect(() => {
        updateFriendList(friends)
    }, [friends])

   console.log(latestChat)
    return (
        <div>

            {
                friendList && friendList.map((e, index) => {
                    
                    const currentUnread = contactUnread[e._id]
                    const name = e.firstName + " " + e.lastName
                    const { picturePath } = e
                    const backgroundColor = e._id ===currReciever ? {backgroundColor:primaryLight} :undefined
                    return (
                        <Button
                            onClick={() => {
                                dispatch(setReceiver({
                                    id: e._id,
                                    icon:picturePath,
                                    name:name
                                }))
                                dispatch(setReadPersonMessage({
                                    id: e._id
                                }))
                                
                            }}
                            sx={{width:"100%", backgroundColor:backgroundColor}}
                        >
                            <FlexBetween gap="3rem" sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                                width: "90%"
                            }}> 
                            <Box sx={{position:"relative"}}>
                                <UserImage image={picturePath} size="55px" >
                                </UserImage> 
                                {   
                                    
                                    currentUnread>0 && <NotificationBadge number={currentUnread} type="message"/> 
                                }
                            </Box>
                                
                                <Box sx={{width:"60%"}}>
                                    <Typography
                                        color={main}
                                        variant="h7"
                                        fontWeight="500"
                                        sx={{textAlign:"left"}}
                                    >
                                        {name}
                                    </Typography>
                                    <Typography color={medium} fontSize="0.7rem" style={{whiteSpace: "nowrap"  ,overflow: "hidden",textOverflow: "ellipsis"}}>
                                        { latestChat[e.id]}
                                    </Typography>
                                </Box>
                            </FlexBetween>
                        </Button>
                    )
                })
            }

        </div>
    )

}


