export const hitungLuasLingkaran = (radius: number): number => {
    let pi: number;
    if (radius % 7 === 0) {
        pi = 22/7
    } else {
        pi = 3.14
    }
    return Math.pow(radius, 2) * pi
}