import { createSlice } from "@reduxjs/toolkit";
import { setLogout } from "state";

const initialMessageState = {
    sender:null,
    receiver:{id: null, icon:"",name:""},
    something:null
  };
  
export const messageSlice = createSlice({
    name: 'message',
    initialState:initialMessageState,
    reducers:{
      setSender : (state,action)=>{
        state.sender = action.payload.sender
      },
      setReceiver : (state,action)=>{
        state.receiver.id = action.payload.id
        state.receiver.icon = action.payload.icon
        state.receiver.name = action.payload.name
      },
      setLogout: (state,action)=>{
        state = initialMessageState;
      }
    }

})
export const { setSender,setReceiver } = messageSlice.actions
export default messageSlice.reducer