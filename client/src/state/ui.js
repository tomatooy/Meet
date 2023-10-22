import { createSlice } from "@reduxjs/toolkit";


const initialUiState = {
    chatUi:false
  };
  
export const uiSlice = createSlice({
    name: 'ui',
    initialState:initialUiState,
    reducers:{
        setChatUi: (state,action)=>{
            state.chatUi = action.payload.open
        }
    }

})
export const { setChatUi} = uiSlice.actions
export default uiSlice.reducer