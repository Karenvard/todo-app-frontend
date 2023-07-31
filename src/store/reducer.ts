import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thunks } from "./thunks";
import { IUser } from "../utils/interfaces/IUser";
import { ITodo } from "../utils/interfaces/ITodo";
import { IServerError } from "../utils/interfaces/IServerError";


interface initialStateType {
    authorized: boolean;
    user: IUser;
    todos: ITodo[];
    loading: boolean;
    pending: boolean;
    error: IServerError["error"],
    totalTodosCount: number
}

const initialState: initialStateType = {
    authorized: false,
    user: {
        id: "",
        username: "",
        email: ""
    },
    todos: [],
    totalTodosCount: 0,
    loading: false,
    pending: false,
    error: {type: "", message: ""}
}

const slice = createSlice({
    name: "reducer",
    initialState,
    reducers: {
        signout: (state) => {
            state.authorized = false;
            state.user = {id: "", username: "", email: ""}
            localStorage.setItem("jwt-token", "")
        }
    },
    extraReducers: builder => {
        builder.addCase(Thunks.signup.fulfilled, state => { state.loading = false })
        builder.addCase(Thunks.signup.pending, state => { state.error = {type: "", message: ""} })
        builder.addCase(Thunks.signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || state.error;
        })

        builder.addCase(Thunks.signin.fulfilled, state => { state.loading = false })
        builder.addCase(Thunks.signin.pending, state => { state.error = {type: "", message: ""} })
        builder.addCase(Thunks.signin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || state.error
        })


        builder.addCase(Thunks.getProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.authorized = true;
        })
        builder.addCase(Thunks.getProfile.pending, state => {state.loading = true})
        builder.addCase(Thunks.getProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || state.error;
            state.user = {id: "", username: "", email: ""};
            state.authorized = false;
        })

        builder.addCase(Thunks.getTodos.fulfilled, (state, action) => {
            state.pending = false;
            action.payload.todos.forEach(todo => state.todos.push(todo));
            state.totalTodosCount = action.payload.totalCount;
        })
        builder.addCase(Thunks.getTodos.pending, state => {state.pending = true})
        builder.addCase(Thunks.getTodos.rejected, (state, action) => {
            state.pending = false;
            state.error = action.payload || state.error;
        })

        builder.addCase(Thunks.addTodo.fulfilled, (state, action) => {
            state.pending = false;
            if (state.totalTodosCount%state.todos.length === 0 || state.totalTodosCount === 0) state.todos.push(action.payload);
            state.totalTodosCount += 1;
            state.error = {type:"", message:""}
        })
        builder.addCase(Thunks.addTodo.pending, state => {state.pending = true})
        builder.addCase(Thunks.addTodo.rejected, (state, action) => {
            state.pending = false;
            state.error = action.payload || state.error;
        })
        
        builder.addCase(Thunks.changeTodo.fulfilled, (state, action) => {
            state.pending = false;
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return action.payload;
                };
                return todo;
            })
        })
        builder.addCase(Thunks.changeTodo.pending, state => {state.pending = true})
        builder.addCase(Thunks.changeTodo.rejected, (state, action) => {
            state.pending = false;
            state.error = action.payload || state.error;
        })

        builder.addCase(Thunks.deleteTodo.fulfilled, (state, action) => {
            state.pending = false;
            state.todos = state.todos.filter(todo => todo.id !== action.meta.arg);
            state.totalTodosCount -= 1;
        })
        builder.addCase(Thunks.deleteTodo.pending, state => {state.pending = true});
        builder.addCase(Thunks.deleteTodo.rejected, state => {state.pending = false});
    }
})

export const Reducer = slice.reducer;
export const Actions = slice.actions;