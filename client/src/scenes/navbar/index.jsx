import { useState,useContext,useEffect } from "react";
import { SocketContext } from "context/socket";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state/auth";
import { setChatUi } from "state/ui";
// import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import NotificationBadge from "components/NotificationBadge";
import { addTotalUnreadMessages, setIncomingMessage } from "state/notification";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const currReceiver = useSelector((state) => state.message.receiver.id)
  const user = useSelector((state) => state.auth.user);
  const icon = useSelector((state) => state.auth.user.picturePath)
  const chatUiOpen  = useSelector(state => state.ui.chatUi)
  const totalUnreadMessages = useSelector((state) => state.notification.totalUnread)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const socket = useContext(SocketContext)
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const fullName = `${user.firstName} ${user.lastName}`;
  const [totalUnread, setTotalUnread] = useState(0)
  
  useEffect(() => {
    const handleSocketMessage = (data) => {
      console.log("received")
      console.log(data.sender !== currReceiver)
      if (data.sender !== currReceiver) {
        dispatch(addTotalUnreadMessages());
        dispatch(setIncomingMessage({id:data.sender}))
      }
    };
    if (socket){
      socket.on(user._id,(data)=>handleSocketMessage(data));
    }
    return () => {
      socket.off(user._id)
    }
  }, [currReceiver,dispatch,socket,user._id])

  useEffect(() => {
    setTotalUnread(totalUnreadMessages)
    return () => {
    }
  }, [totalUnreadMessages])

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt} marginBottom="1rem">
      <FlexBetween gap="1.75rem">
        <IconButton onClick={() => { navigate('/home') }} style={{ backgroundColor: 'transparent' }}>
          <img src="/logo.png" style={theme.logo.img} alt='logo' />
        </IconButton>

        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem" color="dark">
          <IconButton onClick={() => dispatch(setMode())} >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton  sx={{backgroundColor:chatUiOpen?background:alt}} onClick={() => {dispatch(setChatUi({open:!chatUiOpen})) }} disabled={chatUiOpen}>
            <Message
              sx={{ color: dark, fontSize: "25px" }} />
              {totalUnread > 0 && <NotificationBadge number={totalUnread}/>}
          </IconButton>
          <IconButton>
            <Notifications sx={{ color: dark, fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <Help sx={{ color: dark, fontSize: "25px" }} />
          </IconButton>
          <UserImage image={icon} size="55px" /> 
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
              socket.emit('user_logout',{id:user._id})
              socket.disconnect()
              dispatch(setLogout())
              }}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ fontSize: "25px" }} />
            </IconButton>
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() =>{ 
                  socket.disconnect();
                  dispatch(setLogout());}
                }>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
