import { useState } from "react";
import { useDispatch } from "react-redux";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDarkSide, useDarkTextChart } from "./useDarkMode";

export default function Switcher() {
    const dispatch = useDispatch()
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const [colorText, setColorText] = useDarkTextChart()
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
        setColorText(colorText);
        dispatch({ type: 'beta/GET_COLOR', payload: colorText })
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