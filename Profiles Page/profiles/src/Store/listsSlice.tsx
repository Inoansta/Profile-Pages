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
        name:"Lionel Messi",
        email:"LMessi@barca.com",
        number:"1234567890"
    },
    {
        picture:"https://cdn.vox-cdn.com/thumbor/9z4uK9wPMaNyZ_8QIA9Lwo3TKo8=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24642404/1488008190.jpg",
        name:"Roberto Lewandowski",
        email:"RLewa@barca.com",
        number:"1234567890"
    },
    {
        picture:"https://cdn-japantimes.com/wp-content/uploads/2022/10/np_file_187166.jpeg",
        name:"Max Verstappen",
        email:"MVerstappen@f1.com",
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