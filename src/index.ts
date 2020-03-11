import * as reader from "./reader";

type NonDet = {
    between : (lower : number, upper : number) => number
}

const fizzbuzz: reader.T<NonDet,string> =
    reader.map(reader.lift(env => env.between(0, 100)), x => {
        const fizz = x % 3 === 0;
        const buzz = x % 5 === 0;
        if (fizz) {
            if (buzz) {
                return "fizzbuzz";
            } else {
                return "fizz";
            }
        } else {
            if (buzz) {
                return "buzz";
            } else {
                return x.toString();
            }
        }
    });

const impureNonDet : NonDet = {
    between : (lower, upper) =>
        Math.round(Math.random() * (upper - lower) + lower)
};

if (require.main === module) {
    console.log(fizzbuzz.run(impureNonDet));
}
