import { useContext } from "react";

import { HandleContext } from "../context/HandleContext";

export const useHandle = () => {
  return useContext(HandleContext);
};