import React,{useEffect,useRef}from 'react'
import { Box, Grid} from "@mui/material";
import ChatMain from 'components/ChatMain'
import ChatList from 'components/Contact'
import { resetReceiver } from 'state/message';
import { useSelector,useDispatch } from 'react-redux';
import { setChatUi } from 'state/ui';



const ChatPage = ()=> {
    const dispatch = useDispatch()
    const ref = useRef()
    const chatUiOpen = useSelector((state)=>(state.ui.chatUi))
    useEffect(() => {
        return () => {
            dispatch(resetReceiver())
        }
    }, [dispatch])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (chatUiOpen && !ref.current.contains(e.target)){
                dispatch(setChatUi({open:false}))
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [chatUiOpen,dispatch])

    
    return (
        <Box className="modal" sx={{width:"70vw",position:"absolute",zIndex:"3",right:"0"}}  ref={ref}>
                <Grid container  sx={{margin:"auto",height:"50vh",border:"1px solid rgba(0,0,0,.1)",borderRadius:"0.75rem",overflow:"hidden"}}>
                    <Grid item xs={3} backgroundColor="white" sx={{padding:"5px"}} >
                        <ChatList />
                    </Grid>
                    <Grid item xs={9}  backgroundColor="white" sx={{height:"100%",borderLeft:"1px solid rgba(0,0,0,.1)"}}>
                        <ChatMain />
                    </Grid>
                </Grid>
        </Box>
    )
}

export default ChatPage;