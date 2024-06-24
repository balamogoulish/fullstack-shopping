import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const registerUser = createAsyncThunk(
    "user/registerUser",
    async(body, thunkAPI) =>{
        try{
            const response = await axiosInstance.post(
                `/users/register`,
                body
            )
            return response.data;
        } catch (err){
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data || err.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async(body, thunkAPI) =>{
        try{
            const response = await axiosInstance.post(
                `/users/login`,
                body
            )
            return response.data;
        } catch (err){
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data || err.message);
        }
    }
)

export const authUser = createAsyncThunk(
    "user/authUser",
    async(_, thunkAPI) =>{
        try{
            const response = await axiosInstance.get(
                `/users/auth`
            );
            return response.data;
        } catch (err){
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data || err.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async(_, thunkAPI) =>{
        try{
            const response = await axiosInstance.post(
                `/users/logout`
            );
            return response.data;
        } catch (err){
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data || err.message);
        }
    }
)

export const addToCart = createAsyncThunk(
    "user/addToCart",
    async(body, thunkAPI)=>{
        try {
            const response = await axiosInstance.post(
                `/users/cart`,
                body
            )
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
    
)

export const getCartItems = createAsyncThunk(
    "user/getCartItems",
    async({cartItemIds, userCart}, thunkAPI)=>{
        try {
            const response = await axiosInstance.get(
                `/products/${cartItemIds}?type=array`,
            )
            //cartItem에 해당하는 정보를 product collection에서 가져와 quantity정보를 넣음
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index)=>{
                    if(cartItem.id === productDetail._id){
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const removeCartItem = createAsyncThunk(
    "user/removeCartItem",
    async(productId, thunkAPI)=>{
        try {
            const response = await axiosInstance.delete(
                `/users/cart?productId=${productId}`,
            )
            //productInfo, cart정보를 조합해 cartDetail을
            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index)=>{
                    if(item.id === product._id){
                        response.data.productInfo[index].quantity = item.quantity
                    }
                })
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const payProducts = createAsyncThunk(
    "user/payProducts",
    async(body, thunkAPI)=>{
        try {
            const response = await axiosInstance.post(
                `/users/payment`,
                body
            )
            return response.data;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)