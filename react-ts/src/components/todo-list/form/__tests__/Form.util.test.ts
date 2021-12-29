import { act, renderHook } from "@testing-library/react-hooks"
import { useFormUtils } from ".."

describe('Form Utility Test', () => {
    test('title functionality', () => {
        const { result } = renderHook(() => useFormUtils());

        expect(result.current.title).toBeDefined();
        expect(result.current.title).toEqual("");

        act(() => {
            result.current.setTitle("Judul Baru")
        })
        expect(result.current.title).toEqual("Judul Baru")
    })
})