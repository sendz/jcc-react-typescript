import { grading } from "../grading"

describe("Fungsi grading, nilai angka menjadi nilai huruf", () => {
    describe("mengembalikan nilai A", () => {
        test("input nilai 91", () => {
            expect(grading(91)).toEqual("A")
        })

        test("input nilai 100", () => {
            expect(grading(100)).toEqual("A")
        })

        test("input nilai 110", () => {
            expect(grading(110)).toEqual("A")
        })
    })
    describe("mengembalikan nilai B", () => {
        test("input nilai 81", () => {
            expect(grading(81)).toEqual("B")
        })

        test("input nilai 85", () => {
            expect(grading(85)).toBe("B")
        })
        
        test("input nilai 90", () => {
            expect(grading(90)).toEqual("B")
        })
    })

    describe("mengembalikan nilai C", () => {
        test("input nilai 61", () => {
            expect(grading(61)).toEqual("C")
        })
    })

    describe("mengembalikan nilai F", () => {
        test("input nilai 0", () => {
            expect(grading(0)).toEqual("F")
        })
    })
})