const { v4 } = require("uuid")
export const generateId = (): string => {
    return v4()
}