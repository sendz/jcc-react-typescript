import React, { useState } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { mount } from 'enzyme';
import { MockToDoListProvider } from './__tests_utils__/MockToDoListContext';

test('renders learn react link', () => {
  render(
    <MockToDoListProvider>
      <App />
    </MockToDoListProvider>
  );
  const linkElement = screen.getByText(/Simple ToDo List App/i);
  expect(linkElement).toBeInTheDocument();
});


jest.mock("./helpers/generateId", () => ({
  generateId: () => "abcd"
}))

describe("Main App Integration testing", () => {

  const mockAddTodo = jest.fn()
  const mockDeleteTodo = jest.fn()
  const mockUpdateTodo = jest.fn()

  test("full integration", () => {

    const screen = mount(
      <MockToDoListProvider addTodo={mockAddTodo}>
        <App />
      </MockToDoListProvider>
    );

    expect(screen.exists('[data-testid="input-title"]')).toBeTruthy();
    screen.find('[data-testid="input-title"]').simulate("change", {
      target: {
          value: "Judul Baru"
      }
    })

    screen.find('button[data-testid="save-button"]').simulate("click");

    expect(mockAddTodo).toHaveBeenCalledTimes(1)
    expect(mockAddTodo).toHaveBeenLastCalledWith({
      id: "abcd",
      isDone: false,
      title: "Judul Baru"
    });
 
    expect(screen.text()).toMatch(/Judul Baru/)
  })
})
