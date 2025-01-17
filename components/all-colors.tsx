import React from "react";
import { HSLColor } from "@/lib/types";
import {
  getBrightness,
  getTextColorByBrightnes,
  hslToHslString,
  hslToRGB,
} from "@/lib/helpers/utils";

type Props = {
  colors: Array<HSLColor>;
  setSelectedIndex: (index: number) => void;
  selectedIndex: number;
  clearAllColors: () => void;
};

type ColorBoxProps = {
  index: number;
  color: HSLColor;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

function ColorBox({
  color,
  index,
  setSelectedIndex,
  selectedIndex,
}: ColorBoxProps) {
  const colorString = React.useMemo(() => hslToHslString(color), [color]);
  const textColor = React.useMemo(
    () => getTextColorByBrightnes(getBrightness(hslToRGB(color))),
    [color],
  );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedIndex(index);
      }}
      className={"color-box flex relative"}
      style={{ backgroundColor: colorString, color: textColor }}
    >
      {index === selectedIndex ? (
        <span
          className={"selected-color absolute"}
          style={{ color: textColor }}
        >
          ✔
        </span>
      ) : null}
      {index + 1}
    </div>
  );
}

function AllColors({
  colors,
  selectedIndex,
  setSelectedIndex,
  clearAllColors,
}: Props) {
  const [showBoxes, toggleShowBoxes] = React.useState<boolean>(false);
  const handleToggleClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      toggleShowBoxes((isShowing) => !isShowing);
    },
    [toggleShowBoxes],
  );

  const handleClearClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      clearAllColors();
    },
    [clearAllColors],
  );
  return showBoxes ? (
    <div className={"flex all-colors absolute"}>
      {colors.map((c, index) => (
        <ColorBox
          key={`cb-${index}`}
          index={index}
          color={c}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      ))}
      <button className={"show-hide-button"} onClick={handleToggleClick}>
        Hide All Colors
      </button>
      <button className={"show-hide-button"} onClick={handleClearClick}>
        Clear All Colors
      </button>
    </div>
  ) : (
    <div className={"flex all-colors absolute hide-all"}>
      <span className={"absolute flex total-colors"}>{colors.length}</span>
      <button className={"show-hide-button"} onClick={handleToggleClick}>
        Show All Colors
      </button>
    </div>
  );
}

export default AllColors;
