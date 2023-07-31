import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../utils/api";
import { toast } from "react-toastify";
import { IServerError } from "../utils/interfaces/IServerError";
import { IUser } from "../utils/interfaces/IUser";
import { IRejectValueError } from "../utils/interfaces/IRejectValueError";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ITodo } from "../utils/interfaces/ITodo";


function unexpectedError(thunkAPI: BaseThunkAPI<any, any, any, IServerError['error']>) {
    return thunkAPI.rejectWithValue({
        type: "unexpected",
        message: "Unexpected error. Please check your internet connection."
    });
}

interface IThunksArgs {
    signup: { username: string, password: string, email: string }
    signin: { login: string, password: string, rememberMe: boolean }
    addTodo: { body: string, color: string }
    changeTodo: { id: string, body: string, color: string, finished: boolean }
}

export class Thunks {
    static signup = createAsyncThunk<{}, IThunksArgs['signup'], IRejectValueError>(
        "signup",
        async (newUser, thunkAPI) => {
            try {
                const { data, status } = await Api.signup(newUser.username, newUser.password, newUser.email);
                if (status === 200) {
                    return toast.success(data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                        theme: "light",
                    })
                } else {
                    return thunkAPI.rejectWithValue(data.error);
                }
            } catch (e: any) {
                return unexpectedError(thunkAPI);
            }
        })


    static signin = createAsyncThunk<{}, IThunksArgs["signin"], IRejectValueError>("signin", async (userData, thunkAPI) => {
        try {
            const { data, status } = await Api.signin(userData.login, userData.password, userData.rememberMe);
            console.log(status, data);
            if (status === 200) {
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });;
                localStorage.setItem("jwt-token", data.token);
                return thunkAPI.dispatch(this.getProfile());
            } else {
                return thunkAPI.rejectWithValue(data.error);
            }
        } catch (_) {
            return unexpectedError(thunkAPI);
        }
    })

    static getProfile = createAsyncThunk<IUser, undefined, IRejectValueError>("getprofile", async (_, thunkAPI) => {
        try {
            const { data, status } = await Api.getUser();
            if (status !== 200) {
                return thunkAPI.rejectWithValue(data.error);
            }
            return data.user;
        } catch (_) {
            return unexpectedError(thunkAPI);
        }
    })

    static getTodos = createAsyncThunk<{
        todos: ITodo[],
        totalCount: number
    }, number, IRejectValueError>("gettodos", async (page, thunkAPI) => {
        try {
            const { data, status } = await Api.getTodos(page);
            if (status === 200) {
                return thunkAPI.fulfillWithValue({ todos: data.todos, totalCount: data.totalCount });
            } else {
                return thunkAPI.rejectWithValue(data.error);
            }
        } catch (_) {
            return unexpectedError(thunkAPI);
        }
    })

    static addTodo = createAsyncThunk<ITodo, IThunksArgs["addTodo"], IRejectValueError>("addtodo", async (newTodoData, thunkAPI) => {
        try {
            const { data, status } = await Api.addTodo(newTodoData.body, newTodoData.color);
            if (status === 200) {
                return thunkAPI.fulfillWithValue(data.newTodo);
            } else {
                return thunkAPI.rejectWithValue(data.error);
            }
        } catch (_) {
            return unexpectedError(thunkAPI);
        }
    })

    static changeTodo = createAsyncThunk<ITodo, IThunksArgs["changeTodo"], IRejectValueError>("changetodo", async (todoData, thunkAPI) => {
        try {
            const { data, status } = await Api.changeTodo(todoData.id, todoData.finished, todoData.body, todoData.color);
            if (status === 200) {
                return thunkAPI.fulfillWithValue(data.todo);
            } else {
                return thunkAPI.rejectWithValue(data.error);
            }
        } catch (_) {
            return unexpectedError(thunkAPI);
        }
    })

    static deleteTodo = createAsyncThunk<{}, string, IRejectValueError>("deletetodo", async (id, thunkAPI) => {
        try {
            const { data, status } = await Api.deleteTodo(id);
            if (status === 200) {
                return;
            } else {
                return thunkAPI.rejectWithValue(data.error);
            }
        } catch (_) {
            return unexpectedError(thunkAPI);
        }
    })
}