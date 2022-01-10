import { act, renderHook } from "@testing-library/react-hooks"
import { useFormUtils } from ".."
import { ToDoListContext, ToDoListContextInterface, ToDoListProvider } from "../../../../providers/ToDoList.provider"

jest.mock("../../../../helpers/generateId", () => ({
    generateId: () => "abcd"
}))

describe('Form Utility / Form State Testing', () => {
    const mockAddTodo = jest.fn()

    test('saveTodo should save new todo when success', () => {
        const wrapper = ({children}: any) => (
            <ToDoListContext.Provider value={{
                addTodo: mockAddTodo,
                todos: []
            } as unknown as ToDoListContextInterface}>{children}</ToDoListContext.Provider>
        )
        const { result } = renderHook(() => useFormUtils(), { wrapper });
    
        act(() => {
            result.current.setTitle('Unit Testing')
        })

        expect(result.current.title).toEqual('Unit Testing')

        act(() => {
            result.current.saveTodo()
        })

        expect(result.current.generateId()).toEqual("abcd")
        expect(mockAddTodo).toHaveBeenCalledTimes(1)
        expect(mockAddTodo).toHaveBeenCalledWith({
            id: "abcd",
            isDone: false,
            title: "Unit Testing"
        })
    })
})

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