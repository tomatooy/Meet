import React  from 'react'
import { Box, Container, Grid, useTheme } from "@mui/material";
import ChatMain from 'components/ChatMain'
import ChatList from 'components/Contact'
import Navbar from 'scenes/navbar';

const ChatPage = ()=> {
    const theme = useTheme()
    return (
        <Box>
            <Navbar />
            <Container maxWidth="xl">
                <Grid container spacing={1} sx={{margin:"auto",height:"50vh"}}>
                    <Grid item xs={3} backgroundColor="white" >
                        <ChatList />
                    </Grid>
                    <Grid item xs={9}  backgroundColor="white" sx={{height:"100%"}}>
                        <ChatMain />
                    </Grid>
                </Grid>

            </Container>
        </Box>
    )
}

export default ChatPage;