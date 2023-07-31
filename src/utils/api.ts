import axios from "axios";
import {IServerMessage} from "./interfaces/IServerMessage";
import {IServerError} from "./interfaces/IServerError";
import {TypedServerMessage} from "./interfaces/TypedServerMessage";
import {IUser} from "./interfaces/IUser";
import {ITodo} from "./interfaces/ITodo";

const $host = axios.create({baseURL: "http://localhost:5555", validateStatus: () => true});
const $authHost = axios.create({baseURL: "http://localhost:5555", validateStatus: () => true});
$authHost.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("jwt-token")}`;
    return config;
})

export class Api {
    static async signup(username: string, password: string, email: string) {
        return $host.post<IServerMessage & IServerError>("/signup", {username, password, email});
    }

    static async signin(login: string, password: string, rememberMe: boolean = false) {
        return $host.post<TypedServerMessage<{token: string}> & IServerError>("/signin", {login, password, rememberMe});
    }

    static async getUser() {
        return $authHost.get<{ user: IUser } & IServerError>("/user");
    }

    static async getTodos(page: number) {
        return $authHost.get<{todos: ITodo[], totalCount: number} & IServerError>(`/todos?page=${page}`);
    }

    static async addTodo(body: string, color: string) {
        return $authHost.post<{newTodo: ITodo} & IServerError>("/todos", {body, color});
    }

    static async changeTodo(id: string, finished: boolean, body: string, color: string) {
        return $authHost.put<{todo: ITodo} & IServerError>(`/todos/${id}`, {finished, body, color});
    }

    static async deleteTodo(id: string) {
        return $authHost.delete<IServerMessage & IServerError>(`/todos/${id}`);
    }
}