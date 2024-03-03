import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialState {
    value: number;
}

const initialState: initialState = {
    value: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers : {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        //     console.log(state.value);
            
        // },
    },
})

export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;
