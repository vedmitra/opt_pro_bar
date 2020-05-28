import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { baseUrl } from "../api/apiUtils";

const ProgressStack = () => {
  const [progressStack, setProgressStack] = useState({
    buttons: [],
    bars: [],
    limit: 0,
  });
  const [progressBars, setProgressBars] = useState();
  const [buttons, setButtons] = useState();
  const buildBarDropdown = (bars: any[] = [], limit: number) => {
    const barsList = bars.map((bar: any, index: number) => {
      return {
        id: index + 1,
        text: `Progress ${index + 1}`,
        width: Math.round((bar / limit) * 100),
        selected: index === 0,
        overflow: false,
      };
    });
    setProgressBars(barsList);
  };
  const progressBarChange = (e: any) => {
    let tempBar = [...progressBars];
    tempBar.forEach((bar: any) => {
      bar.selected = Number(e.target.value) === bar.id;
    });
    setProgressBars(tempBar);
  };
  const onButtonClick = (e: any, index: number) => {
    let tempBar = [...progressBars];
    tempBar.forEach((bar: any) => {
      if (bar.selected) {
        let newValue = Number(e.target.value) + bar.width;
        bar.width = Math.round(newValue < 0 ? 0 : newValue);
      }
    });
    setProgressBars(tempBar);
  };
  const getProgressData = async () => {
    const apiUrl = baseUrl + "/progress-stack/";
    const resPromise = await fetch(apiUrl);
    const response = await resPromise.json();
    setProgressStack(response);
    buildBarDropdown(response && response.bars, response && response.limit);
    setButtons(response && response.buttons);
  };
  useEffect(() => {
    getProgressData();
  }, []);
  return (
    <>
      <div className={"card"}>
        <div className={"card-header"}>Progress bar Demo</div>
        <div className={"card-body"}>
          {progressStack && (
            <div>
              {progressBars &&
                progressBars.map((bar: any, index: number) => {
                  return <ProgressBar key={index} progressWidth={bar.width} />;
                })}
            </div>
          )}
          <div className="float-left margin-bottom-10">
            <select onChange={(e: any) => progressBarChange(e)}>
              {progressBars &&
                progressBars.map((bar: any, index: number) => {
                  return (
                    <option key={index} value={bar.id}>
                      {bar.text}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="float-right">
            {progressStack &&
              buttons &&
              buttons.map((btn: any, index: number) => {
                return (
                  <button
                    type="button"
                    key={index}
                    value={btn}
                    className="btn btn-secondary margin-right-10px margin-bottom-10"
                    onClick={(e: any) => onButtonClick(e, index)}
                  >
                    {btn}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressStack;
