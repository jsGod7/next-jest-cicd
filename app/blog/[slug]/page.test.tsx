/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page"; // Import component từ file page.tsx

it("App Router: Works with dynamic route segments", () => {
  render(<Page params={{ slug: "Test" }} />);
  expect(screen.getByRole("heading")).toHaveTextContent("Slug: Test");
});

it("HoleTex should be in the document", () => {
  render(<Page params={{ slug: "Test" }} />);
  expect(screen.getByText("HoleTex")).toBeInTheDocument();
});