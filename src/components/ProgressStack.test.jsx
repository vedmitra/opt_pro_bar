import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ProgressStack from "./ProgressStack";
import { act } from "react-dom/test-utils";
import { progressbar } from "../mockAPI/fixtures/progressbar";
import { getProgressData } from "../api/progressData";

let progressData;
beforeAll(() => {
  progressData = progressbar;
});
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("renders progress stack component", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => {
        return Promise.resolve(progressData);
      },
    })
  );
  await act(async () => {
    render(<ProgressStack />, container);
  });
  expect(container.querySelectorAll("button").length).toBe(
    progressData.buttons.length
  );
});
it("check all buttons render", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => {
        return Promise.resolve(progressData);
      },
    })
  );
  await act(async () => {
    render(<ProgressStack />, container);
  });
  expect(container.querySelectorAll("select").length).toBe(1);
});
it("check all progress bar render", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => {
        return Promise.resolve(progressData);
      },
    })
  );
  await act(async () => {
    render(<ProgressStack />, container);
  });
  expect(container.querySelectorAll(".progress-bar-outer").length).toBe(
    progressData.bars.length
  );
});
it("check button click updates bar", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => {
        return Promise.resolve(progressData);
      },
    })
  );
  await act(async () => {
    render(<ProgressStack />, container);
  });
  const initialWidth = container
    .querySelector(".progress-bar-outer")
    .textContent.split("%")[0];
  const buttonValue = container.querySelector("button").textContent;
  await act(async () => {
    container.querySelector("button").click();
  });
  expect(container.querySelector(".progress-bar-outer").textContent).toBe(
    `${Number(initialWidth) + Number(buttonValue)}%`
  );
});
