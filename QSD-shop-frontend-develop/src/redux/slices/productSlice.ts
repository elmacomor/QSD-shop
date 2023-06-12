import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { stat } from 'fs';

// Define a type for the slice state

  interface Brand {
    id: number;
    name: string;
    created_at: string;
  }
  
  interface Size {
    id: number;
    size: string;
    created_at: string;
  }
  
  interface Category {
    id: number;
    name: string;
    created_at: string;
  }
  interface Color {
    id: number;
    name: string;
    hex_code: string;
    created_at: string;
    updated_at: string;
  }
  
  interface Product {
    id: number;
    name: string;
    price: number;
    average_rating: number;
    is_favorite: boolean;
    gender: number;
    brands: Brand;
    colors: Color[];
    categories: Category[];
    sizes: Size[];
  }
interface cartProduct{
    product:Product;
    amount:number;
    size:Size;
}
interface cartProductList{
    cartProducts:cartProduct[];
}
// Define the initial state using that type
const initialState: cartProductList = {
  cartProducts:[],
}

export const productSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {


    // Use the PayloadAction type to declare the contents of `action.payload`
    AddCartProduct: (state, action: PayloadAction<{
        product:Product;
        amount:number;
        size:Size}>) => {
            console.log("promijenjen state");
            console.log(action.payload.product);
            console.log(action.payload.amount);
            console.log(action.payload.size);

            const productExist=state.cartProducts.some((item)=>item.product.id===action.payload.product.id);
            if(productExist){
              state.cartProducts=state.cartProducts.filter((item)=>item.product.id!==action.payload.product.id);
            }
            else{
              state.cartProducts=[...state.cartProducts,{product:action.payload.product,
                amount:action.payload.amount,
                size:action.payload.size}];
            } 
        },
        RemoveCartProduct: (state, action: PayloadAction<{
          product:Product;
          amount:number;
          size:Size}>) => {
            state.cartProducts=state.cartProducts.filter((item)=>item.product.id!==action.payload.product.id);
          },

          ChangeAmount: (state, action: PayloadAction<{
            product:Product;
            amount:number;
            size:Size}>) => {
              const temp=state.cartProducts.map((item)=>{
                if(item.product.id===action.payload.product.id){

                  return{...item,amount:action.payload.amount};
                }
                else{
                  return item;
                }
              })
              state.cartProducts=[...temp];
            },

      },
      
})

export const { AddCartProduct,RemoveCartProduct,ChangeAmount } = productSlice.actions



export default productSlice.reducer