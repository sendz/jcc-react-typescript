import React from "react";
import {create} from "react-test-renderer";
import { ToDoListForm } from "..";

describe("snapshot test for Form", () => {
    test("render snapshot", () => {
        const tree = create(
            <ToDoListForm/>
        ).toJSON()
        expect(tree).toMatchSnapshot();
    });
});