import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { stat } from 'fs';

// Define a type for the slice state
interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password:string;
    role: number;
    phone: string,
    city: string,
    address: string,
    zip_code: string,
    access_token: string;
}

// Define the initial state using that type
const initialState: User = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password:"",
    role: 0,
    phone: "",
    city: "",
    address: "",
    zip_code: "",
    access_token: "",
}

export const userSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {


    // Use the PayloadAction type to declare the contents of `action.payload`
    LogInUser: (state, action: PayloadAction<{
        id:number;
        first_name: string;
        last_name: string;
        email: string;
        password:string;
        role: number;
        phone: string;
        city: string;
        address: string;
        zip_code: string;
        access_token: string}>) => {
            console.log("promijenjen state");
            console.log(action.payload.first_name);
            console.log(action.payload.last_name);
            console.log(action.payload.email);
            console.log(action.payload.role);
            console.log(action.payload.access_token);

            state.id=action.payload.id;
            state.first_name=action.payload.first_name;
            state.last_name=action.payload.last_name;
            state.email=action.payload.email;
            state.password=action.payload.password;
            state.role=action.payload.role;
            state.phone=action.payload.phone;
            state.city=action.payload.city;
            state.address=action.payload.address;
            state.zip_code=action.payload.zip_code;
            state.access_token=action.payload.access_token;
            
    },
  },
})

export const { LogInUser } = userSlice.actions



export default userSlice.reducer