export declare type ValueOf<T> = T[keyof T];
export declare type LiteralUnion<T extends U, U = string> = T | (Pick<U, never> & {
    _?: never;
});
export interface ArrayLike<T> {
    [index: number]: T;
    length: number;
}
export declare type Unique<T, U> = Pick<T, Exclude<keyof T, keyof U>>;
export declare type MergeObject<T, U> = {
    [K in keyof T & keyof U]: T[K] extends Record<string, unknown> ? U[K] extends Record<string, unknown> ? Merged<T[K], U[K]> : T[K] : T[K];
};
export declare type Merged<From, To> = Unique<From, To> & Unique<To, From> & MergeObject<From, To>;
