
import { render, screen } from "@testing-library/react";
import TestComponent from "../TestComponent";


    test("renders test component", () => {
        render(<TestComponent />);
        const element = screen.getByText(/Hello world!/i)
        expect(element).toBeInTheDocument()
    })
