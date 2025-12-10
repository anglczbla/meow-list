import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CatContext } from "../../context/CatContext";
import ListCat from "../ListCat";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockCats = [
  {
    id: 1,
    name: "kucing satu",
    origin: "indonesia",
    temperament: "santuy",
    image: "img1.jpg",
  },
  {
    id: 2,
    name: "kucing dua",
    origin: "jepang",
    temperament: "galak",
    image: "img2.jpg",
  },
];

const defaultContextValue = {
  isLoading: false,
  isError: false,
  cat: { totalPages: 1 },
  listCat: [],
  deleteCat: jest.fn(),
  addToFavorites: jest.fn(),
  alreadyOnFavorites: jest.fn(() => false),
  removeFavorite: jest.fn(),
  setPage: jest.fn(),
  page: 1,
  deletes: [],
  setDeletes: jest.fn(),
  setListCat: jest.fn(),
  allCats: [],
};

const renderListCat = (props = {}, contextOverrides = {}) => {
  return render(
    <CatContext.Provider
      value={{ ...defaultContextValue, ...contextOverrides }}
    >
      <BrowserRouter>
        <ListCat cats={mockCats} {...props} />
      </BrowserRouter>
    </CatContext.Provider>
  );
};

describe("ListCat Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render loading state correctly", () => {
    renderListCat({}, { isLoading: true });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("should render error state correctly", () => {
    renderListCat({}, { isError: true });
    expect(screen.getByText(/Error loading cats/i)).toBeInTheDocument();
  });

  test("should render list of cats correctly", () => {
    renderListCat();
    expect(screen.getByText("Kucing Satu")).toBeInTheDocument();
    expect(screen.getByText("Kucing Dua")).toBeInTheDocument();
    expect(screen.getAllByText(/Origin:/i)).toHaveLength(2);
  });

  test("should navigate to detail page when card is clicked", () => {
    renderListCat();
    const card = screen.getByText("kucing satu").closest(".group");
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith("/cat/1");
  });

  test("should call addToFavorites when Fav button is clicked", () => {
    const mockAddToFavorites = jest.fn();
    renderListCat({}, { addToFavorites: mockAddToFavorites });

    const favButtons = screen.getAllByRole("button", { name: "Fav" });
    fireEvent.click(favButtons[0]); // click fav on first cat

    expect(mockAddToFavorites).toHaveBeenCalledWith(mockCats[0]);
  });

  test("should call removeFavorite when Unfav button is clicked", () => {
    const mockRemoveFavorite = jest.fn();
    // simulasi kucing pertama sudah di favorit
    const alreadyOnFavoritesMock = (id) => id === 1;

    renderListCat(
      {},
      {
        removeFavorite: mockRemoveFavorite,
        alreadyOnFavorites: alreadyOnFavoritesMock,
      }
    );

    const unfavButton = screen.getByRole("button", { name: "Unfav" });
    fireEvent.click(unfavButton);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(1);
  });
});
