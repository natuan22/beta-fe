import { useEffect, useState } from "react";

export function useDarkSide() {
  const defaultTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(defaultTheme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}

export function useDarkTextChart() {
  const defaultColor = localStorage.getItem("color") || "#fff";
  const [theme, setTheme] = useState(defaultColor);
  const colorTheme = theme === "#fff" ? "#000" : "#fff";

  useEffect(() => {
    localStorage.setItem("color", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
