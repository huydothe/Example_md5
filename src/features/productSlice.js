import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    detailProduct : []
};

const productSlice = createSlice({
    name: 'product',
    initialState : initialState,
    reducers : {
        getProductDetail(state, action) {
            state.detailProduct.push(action.payload);
        },
        getClearDetail(state, action){
            state.detailProduct = []
        }
    }
})

export const{getProductDetail, getClearDetail} = productSlice.actions;
export default productSlice.reducer;