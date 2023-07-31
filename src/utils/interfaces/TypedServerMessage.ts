export type TypedServerMessage<T> = T & {
    message: string
}