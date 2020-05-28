import React from "react";
import { render } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

test("renders progress bar component", () => {
  const { getByText } = render(<ProgressBar progressWidth={"20"} />);
  const linkElement = getByText(/20/i);
  expect(linkElement).toBeInTheDocument();
});
