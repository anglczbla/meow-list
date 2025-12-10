import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CatContext } from "../../context/CatContext";
import FormCat from "../FormCat";

const mockAddCat = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("FormCat Component", () => {
  beforeEach(() => {
    mockAddCat.mockClear();
    mockNavigate.mockClear();
  });

  test("should render form correctly", () => {
    render(
      <CatContext.Provider value={{ addCat: mockAddCat }}>
        <BrowserRouter>
          <FormCat />
        </BrowserRouter>
      </CatContext.Provider>
    );

    expect(screen.getByText(/Add New Cat/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Cat Name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Submit Cat/i })
    ).toBeInTheDocument();
  });

  test("should call addCat when form is submitted", async () => {
    render(
      <CatContext.Provider value={{ addCat: mockAddCat }}>
        <BrowserRouter>
          <FormCat />
        </BrowserRouter>
      </CatContext.Provider>
    );

    const inputName = screen.getByPlaceholderText(/Cat Name/i);
    fireEvent.change(inputName, { target: { value: "kucing oren" } });

    const submitButton = screen.getByRole("button", { name: /Submit Cat/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddCat).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
