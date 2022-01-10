import { render } from "@testing-library/react"
import { mount, shallow } from "enzyme"
import { ToDoListForm } from ".."
import { ToDoListContext, ToDoListContextInterface } from "../../../../providers/ToDoList.provider"
import { MockToDoListProvider } from "../../../../__tests_utils__/MockToDoListContext"

describe("Form test", () => {
    test("ToDoListForm integration", async () => {
        const mockAddTodo = jest.fn()
        const wrapper = mount(
            <MockToDoListProvider addTodo={mockAddTodo}>
                <ToDoListForm/>
            </MockToDoListProvider>
        )
        expect(wrapper.exists('[data-testid="input-title"]')).toBeTruthy()

        wrapper.find('[data-testid="input-title"]').simulate("change", {
            target: {
                value: "Judul Baru"
            }
        })
        wrapper.find('button[data-testid="save-button"]').simulate("click");

        expect(mockAddTodo).toHaveBeenCalledTimes(1);
    })
})