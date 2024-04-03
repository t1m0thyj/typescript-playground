function stateful(target: any, propertyKey: string): void {
    const privatePropKey = Symbol();
    Reflect.defineProperty(target, propertyKey, {
        get(this: any) {
            return this[privatePropKey];
        },
        set(this: any, value: string) {
            console.log("Setting value to:", value);
            this[privatePropKey] = value;
            const equivalentNode = this.findEquivalentNode();
            if (equivalentNode != null) {
                equivalentNode[privatePropKey] = value;
            }
        }
    });
}

export class MyClass {
    @stateful
    public myProperty: string;

    public otherClass?: MyClass;

    constructor() {
        this.myProperty = "hello";
    }

    public findEquivalentNode() {
        return this.otherClass;
    }
}
