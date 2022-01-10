import { hitungLuasLingkaran } from "../hitungLuas"

describe("Fungsi Hitung Luas", () => {
    test("mengembalikan nilai yang benar", () => {
        expect(hitungLuasLingkaran(7)).toEqual(22/7 * 7 * 7)
    });

    describe("assert ke nilai yang salah", () => {
        test("dengan radius 8, hasil jangan sama dengan radius 7", () => {
            expect(hitungLuasLingkaran(8)).not.toEqual(22/7 * 7 * 7)
        })

        test("dengan radius 8, hasil jangan sama dengan radius 5", () => {
            expect(hitungLuasLingkaran(8)).not.toEqual(22/7 * 5 * 5)
        })
    })
})