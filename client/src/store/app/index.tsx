import { configureStore } from "@reduxjs/toolkit";
import cartSlices, { cartSlicesInf } from "./slices/cartSlices";
import authSlice from "./slices/authSlices";




export const store = configureStore({
    reducer: {
        // hydrate: (state, action) => {
        //     // do not do state = action.payload it will not update the store
        //     return action.payload
        // },
        cartUser: cartSlices,
        auth: authSlice

    },
})
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch