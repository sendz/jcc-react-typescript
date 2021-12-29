export function color() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("Manggil decorator")
    }
}
