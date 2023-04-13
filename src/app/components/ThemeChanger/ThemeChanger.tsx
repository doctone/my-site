"use client";
import { useTheme } from "next-themes";
import { SunIcon } from "@chakra-ui/icons";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button
        onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
        className="bg-none transition-all duration-100 px-8 py-2 text-2xl md:text-4xl hover:text-1xl rounded-lg absolute bottom-12 left-12"
      >
        <SunIcon />
      </button>
    </div>
  );
};
