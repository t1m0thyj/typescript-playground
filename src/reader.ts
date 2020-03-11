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

export function bind<E,A,B>(x : T<E,A>, f : (_ : A) => T<E,B>) : T<E,B> {
    return join(map(x, f))
}

export function ask<E>(): T<E,E> {
    return { run : env => env };
}

export function compose<E,A,B,C>(f : (_ : A) => T<E,B>, g : (_ : B) => T<E,C>) : (_ : A) => T<E,C> {
    return x => bind(f(x), g);
}

export function lift<E,A>(f : (env : E) => A): T<E,A> {
    return { run : f };}
