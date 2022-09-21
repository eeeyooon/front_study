import { useState, useCallback } from "react";
import ThemeContext from "./ThemeContext";
import MainContent from "./MainContent";

function DarkOrLight(props) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = useCallback(() => {
        if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("light");
        }
    }, [theme]);

    //DarkOrLight 컴포넌트는 MainContent 컴포넌트를 자식으로 갖고 있고,
    //이를 ThemeContext.Provider로 감싸서 ThemeContext의 값을 하위 컴포넌트들이 사용할 수 있게 함.
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MainContent />
        </ThemeContext.Provider>
    );
}

export default DarkOrLight;