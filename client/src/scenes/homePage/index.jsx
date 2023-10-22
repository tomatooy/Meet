import { Box, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import Chat from '../chatPage'
import { useContext, useEffect } from "react";
import { SocketContext } from "context/socket";





const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.auth.user);
  const { token } = useSelector((state) => (state.auth))
  const { totalUnread } = useSelector((state) => (state.notification))
  const { chatUi } = useSelector((state) => state.ui)
  const socket = useContext(SocketContext)


  useEffect(() => {
    console.log("home render")
    return () => {
    }
  }, [_id])

  if (socket) {
    socket.emit('user_login', { id: _id })
  }
  return (
    <Box>

      <Navbar />
      {chatUi && <Chat />}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
