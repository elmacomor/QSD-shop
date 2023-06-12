import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userSlice from './slices/userSlice'
import searchSlice from './slices/SearchSlice'
import productSlice from './slices/productSlice'

// ...

const reducer= combineReducers({

   user:userSlice,
   search:searchSlice,
   productCart:productSlice
  
})

export const store=configureStore({reducer})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch