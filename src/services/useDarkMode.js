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
<<<<<<< HEAD
  const colorTheme = theme === "#000" ? "#FFF" : "#000";
=======
  const colorTheme = theme === "#FFF" ? "#000" : "#fff";
>>>>>>> f1b6296cd9c6d5c4d5564383be239e8d0597202e

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('color', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme]
}


