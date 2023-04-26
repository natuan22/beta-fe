import { useEffect, useState } from "react";

export function useDarkSide() {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme]
}

export function useDarkTextChart() {
  const [theme, setTheme] = useState(localStorage.color);
  const colorTheme = theme === "#000" ? "#FFF" : "#000";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('color', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme]
}


