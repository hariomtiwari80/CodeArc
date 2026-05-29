import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

export const HandleContext =
  createContext();

export const HandleProvider = ({
  children,
}) => {

  const [handle, setHandle] =
    useState(() => {

      return (
        localStorage.getItem(
          "cf_handle"
        ) || ""
      );

    });
  useEffect(() => {

    localStorage.setItem(
      "cf_handle",
      handle
    );

  }, [handle]);

  return (

    <HandleContext.Provider
      value={{
        handle,
        setHandle,
      }}
    >

      {children}

    </HandleContext.Provider>

  );
};

export const useHandle = () => {

  return useContext(
    HandleContext
  );

};