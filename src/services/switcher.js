import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDarkSide, useDarkTextChart } from "./useDarkMode";

export default function Switcher() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const [colorText, setColorText] = useDarkTextChart()
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
        setColorText(colorText);
    };

    return (
        <>
            <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
                size={30}
            />
        </>
    );
}