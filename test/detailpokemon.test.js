import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailPokemon from "../app/detail-pokemon/page";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        name: "Bulbasaur",
        // Add other properties as needed for your test cases
      }),
  })
);

// Mock the useQuery hook
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(() => ({
    data: {
      name: "Bulbasaur",
      // Add other properties as needed for your test cases
    },
    error: null,
    status: "success",
  })),
}));

describe("DetailPokemon component", () => {
  test("renders detail information of a Pokemon", async () => {
    render(<DetailPokemon />);
    
    // Wait for the data to be loaded
    await screen.findByText("Detail Pokemon Bulbasaur");

    // Check if the detail information is rendered correctly
    expect(screen.getByText("Detail Pokemon Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();
    // Add assertions for other properties as needed
  });

  // Add more test cases for error handling, loading state, etc.
});
