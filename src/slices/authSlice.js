import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("authToken") 
        ? { token: localStorage.getItem("authToken") } 
        : null
};
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
        setSignUpData(state,value){
            state.signupData = value.payload
        }
    }
})
export const {setLoading,setSignUpData,setToken} = authSlice.actions;
export default  authSlice.reducer