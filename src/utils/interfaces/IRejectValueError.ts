import {IServerError} from "./IServerError";

export interface IRejectValueError {
    rejectValue: IServerError["error"]
}