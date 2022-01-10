import { isEven } from "../isEven"

describe("isEven helper", () => {
    test("return true if even number", () => {
        expect(isEven(2)).toBeTruthy()
    })

    test("return false if odd number", () => {
        expect(isEven(3)).toBeFalsy()
    })
})