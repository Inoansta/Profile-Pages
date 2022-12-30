import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface List {
    picture: string;
    name: string;
    email: string;
    number: string;
}

export interface ListState {
    value: List[]
}

const initialState: ListState = {
    value:[{
        picture: "https://www.ctvnews.ca/content/dam/ctvnews/en/images/2022/12/19/lionel-messi-1-6201143-1671478558748.jpg",
        name:"Lionle Messi",
        email:"LMessi@barca.com",
        number:"1234567890"
    }]
}

const listsSlice = createSlice(
    {
        name: 'lists',
        initialState,
        reducers:{
            load:(state, action)=>{},
            add:(state, action: PayloadAction<List>)=>{
                state.value.push(action.payload)
            },
            edit:(state, action)=>{
                state.value[action.payload.index] = action.payload.information
    
            },
            Delete:(state, action: PayloadAction<number>)=>{
                state.value = state.value.filter((a, b)=>{
                    return b!== action.payload
                })
            },
        },
    },
)
export const {add, edit, Delete} = listsSlice.actions;

export default listsSlice.reducer;