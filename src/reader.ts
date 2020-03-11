export type T<E,A> = {
    run : (env : E) => A
};

export function pure<E,A>(x : A) : T<E,A> {
    return { run : _ => x };
}

export function map<E,A,B>(x : T<E,A>, f : (_ : A) => B) : T<E,B> {
    return { run : env => f(x.run(env)) };
}

export function join<E,A>(x : T<E,T<E,A>>) : T<E,A> {
    return { run : env => x.run(env).run(env) }
}

export function bind<E,A,B>(f : (_ : A) => T<E,B>, x : T<E,A>) : T<E,B> {
    return join(map(x, f))
}

export function ask<E>(): T<E,E> {
    return { run : env => env };
}

export function lift<E,A>(f : (env : E) => A): T<E,A> {
    return { run : f };}
