import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser, authUser,logoutUser, addToCart, getCartItems, removeCartItem, payProducts } from './thunkFunctions';
import { toast } from 'react-toastify';

const initialState = {
    userData: {
        id: '',
        email: '',
        name: '',
        role: 0,
        image: '',
    },
    isAuth: false,
    isLoading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(registerUser.pending, (state)=>{ //회원가입 요청 보냄
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state)=>{ //회원가입 요청 허가됨
            state.isLoading = false;
            toast.info('회원가입을 성공했습니다.')
        })
        .addCase(registerUser.rejected, (state, action)=>{ //회원가입 실패함
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
        .addCase(loginUser.pending, (state)=>{ //로그인 요청 보냄
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action)=>{ //로그인 성공함
            state.isLoading = false;
            state.userData = action.payload;
            state.isAuth = true;
            localStorage.setItem('accessToken', action.payload.accessToken);
        })
        .addCase(loginUser.rejected, (state, action)=>{ //로그인 실패함
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
        .addCase(authUser.pending, (state)=>{ //인증 요청 보냄
            state.isLoading = true;
        })
        .addCase(authUser.fulfilled, (state, action)=>{ //인증 성공함
            state.isLoading = false;
            state.userData = action.payload;
            state.isAuth = true;
        })
        .addCase(authUser.rejected, (state, action)=>{ //인증 실패함
            state.isLoading = false;
            state.error = action.payload;
            state.userData = initialState.userData; //userData 초기화
            state.isAuth = false;
            localStorage.removeItem('accessToken');
        })
        .addCase(logoutUser.pending, (state)=>{ //로그아웃 요청 보냄
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state)=>{ //로그아웃 성공함
            state.isLoading = false;
            state.userData = initialState.userData;
            state.isAuth = false;
            localStorage.removeItem('accessToken');
        })
        .addCase(logoutUser.rejected, (state, action)=>{ //로그아웃 실패함
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
        .addCase(addToCart.pending, (state)=>{ //장바구니 추가 시도함
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action)=>{ //장바구니 추가 성공함
            state.isLoading = false;
            state.userData.cart = action.payload;
            toast.info('장바구니에 추가되었습니다.');
        })
        .addCase(addToCart.rejected, (state, action)=>{ //장바구니 추가 실패함
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
        .addCase(getCartItems.pending, (state)=>{ //장바구니 불러오기 시도함
            state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled, (state, action)=>{ //장바구니 불러오기 성공함
            state.isLoading = false;
            state.cartDetail = action.payload;
        })
        .addCase(getCartItems.rejected, (state, action)=>{ //장바구니 불러오기 실패함
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
        .addCase(removeCartItem.pending, (state)=>{ //장바구니 삭제 시도함
            state.isLoading = true;
        })
        .addCase(removeCartItem.fulfilled, (state, action)=>{ //장바구니 삭제 성공함
            state.isLoading = false;
            state.cartDetail = action.payload.productInfo;
            state.userData.cart = action.payload.cart;
            toast.info("상품이 장바구니에서 제거되었습니다.")
        })
        .addCase(removeCartItem.rejected, (state, action)=>{ //장바구니 삭제 실패함
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
        .addCase(payProducts.pending, (state)=>{ //결제 시도함
            state.isLoading = true;
        })
        .addCase(payProducts.fulfilled, (state)=>{ //결제 성공함
            state.isLoading = false;
            state.cartDetail = [];
            state.userData.cart = [];
            toast.info("성공적으로 상품을 구매했습니다.")
        })
        .addCase(payProducts.rejected, (state, action)=>{ //결제 실패함
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
    }
})

export default userSlice.reducer;