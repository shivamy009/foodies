import {createSlice} from '@reduxjs/toolkit'
// import axios from "axios";

const initialState={
     currentUser:null,
     cart:[]

}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInsuccess:(state,action)=>{
         state.currentUser=action.payload

        },

        mycart:(state,action)=>{
            const Itemindex= state.cart.findIndex((item)=>item._id === action.payload._id)

            if(Itemindex>=0){
                state.cart[Itemindex].quantity +=1;
            }else{
                const temp = {...action.payload,quantity:1}
                state.cart=[...state.cart,temp]
            }
           
           
            
        },
        // remove perticular item
        removetocart:(state,action)=>{
            const data = state.cart.filter((ele)=>ele._id !== action.payload);
            // console.log(state.cart[0]._id)
            state.cart=data
        },

        // remove single item

        removesingleItem :(state,action)=>{
            const itemindex_dec= state.cart.findIndex((item)=>item._id === action.payload._id)
            if(state.cart[itemindex_dec].quantity>=1){
                state.cart[itemindex_dec].quantity -=1;
            }
        },

        // add single item

        addsingleItem:(state,action)=>{
            const itemindex_inc=state.cart.findIndex((item)=>item._id === action.payload._id) 
            
            state.cart[itemindex_inc].quantity +=1;

               }
    }
},[])
// axios.defaults.headers.common['Authorization']=initialState.currentUser?.token
export const {signInsuccess,mycart,removetocart,removesingleItem,addsingleItem}=userSlice.actions;

export default userSlice.reducer