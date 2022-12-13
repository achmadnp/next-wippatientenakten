import { useState } from "react";

export const Dropdown = ({}) => {
  const [expand, setExpand] = useState(false);
  const expandClass = expand ? "display" : "hidden";
  const contentClass = `${expandClass} p-4 text-white mx-8`;

  return <div className="relative p-4"></div>;
};
