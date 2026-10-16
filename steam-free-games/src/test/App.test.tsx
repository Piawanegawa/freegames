import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("App", () => {
  it("shows the Steam Free Games title", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Steam Free Games" })).toBeTruthy();
  });
});
