export const grading = (value: number): string => {
    /* 
    * A : 91 - 100
    * B : 81 - 90
    * C : 61 - 80
    * D : 31 - 60
    * E : 1 - 30
    * F : 0
    */
    if (value >= 1 && value <= 30) {
        return "E"
    } else if (value >= 31 && value <= 60) {
        return "D"
    } else if (value >= 61 && value <= 80) {
        return "C"
    } else if (value >= 81 && value <= 90) {
        return "B"
    } else if (value >= 91) {
        return "A"
    }
    return "F"
}