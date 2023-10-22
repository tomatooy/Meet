import { createSlice } from "@reduxjs/toolkit";


const initialMessageState = {
    sender:null,
    receiver:{id: null, icon:"",name:""},
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
      resetReceiver : (state)=>{
        state.receiver = initialMessageState.receiver
      }
    
    }

})
export const { setSender,setReceiver,resetReceiver } = messageSlice.actions
export default messageSlice.reducer