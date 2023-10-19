import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FlexBetween from "./FlexBetween";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "./UserImage";
import { setReceiver } from 'state/message';

const URL = "http://localhost:3001"
export default function Contact() {

    const friends = useSelector((state) => state.auth.user.friends);
    const currReciever = useSelector((state) => state.message.receiver.id);
    const [friendList, updateFriendList] = useState();
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const dispatch = useDispatch()

    useEffect(() => {
        updateFriendList(friends)
    }, [])
    return (
        <div>

            {
                friendList && friendList.map((e, index) => {
                    const name = e.firstName + " " + e.lastName
                    const { picturePath, location } = e
                    const backgroundColor = e._id ===currReciever ? {backgroundColor:primaryLight} :{}
                    return (
                        <Button
                            onClick={() => {
                                dispatch(setReceiver({
                                    id: e._id,
                                    icon:picturePath,
                                    name:name
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
                                <UserImage image={picturePath} size="55px" />
                                <Box>
                                    <Typography
                                        color={main}
                                        variant="h5"
                                        fontWeight="500"
                                    >
                                        {name}
                                    </Typography>
                                    <Typography color={medium} fontSize="0.75rem">
                                        {location}
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

async function getUser() {
    axios.get(`${URL}/`)
}
