import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { stat } from 'fs';

// Define a type for the slice state
interface SearchValue {
    name:string;
}

// Define the initial state using that type
const initialState: SearchValue = {
   name:"",
}

export const searchSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {


    // Use the PayloadAction type to declare the contents of `action.payload`
    ChangeSearch: (state, action: PayloadAction<{
        name:string}>) => {
            console.log("promijenjen state");
            console.log(action.payload.name);
           

            state.name=action.payload.name;
            
    },
  },
})

export const { ChangeSearch } = searchSlice.actions



export default searchSlice.reducer