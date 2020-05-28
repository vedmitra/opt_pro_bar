import React from "react";

interface IProgressBarProps {
  barWidth?: string;
  barHeight?: string;
  maxWidth?: string;
  minWidth?: string;
  progressWidth?: string;
  progressColor?: String;
  overflowColor?: String;
}
const defaultProps: IProgressBarProps = {
  barWidth: "100%",
  barHeight: "50px",
  maxWidth: "100%",
  minWidth: "50px",
  progressWidth: "0",
  progressColor: "green",
  overflowColor: "red",
};

const ProgressBar = (props?: IProgressBarProps) => {
  const getProgressWidth = () => {
    return props && Number(props.progressWidth) > 100
      ? 100
      : (props && props.progressWidth) || defaultProps.progressWidth;
  };
  const barStyles: any = {
    width: (props && props.barWidth) || defaultProps.barWidth,
    height: (props && props.barHeight) || defaultProps.barHeight,
    maxWidth: (props && props.maxWidth) || defaultProps.maxWidth,
    minWidth: (props && props.minWidth) || defaultProps.minWidth,
  };
  const progressStyles: any = {
    width: `${getProgressWidth()}%`,
    height: "inherit",
    background:
      (props &&
        (Number(props.progressWidth) > 100
          ? defaultProps.overflowColor
          : props.progressColor)) ||
      defaultProps.progressColor,
  };
  return (
    <div
      className="col-sm-12 border margin-bottom-10 padding-0 progress-bar-outer"
      style={barStyles}
    >
      <div className="progress-bar-text">{`${
        props && props.progressWidth
      }%`}</div>
      <div style={progressStyles}></div>
    </div>
  );
};

export default ProgressBar;
