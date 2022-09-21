import { useContext } from "react";
import ThemeContext from "./ThemeContext";

function MainContent(props) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    //ThemeContext로부터 현재 설정된 테마값을 받아와 실제 화면의 컨텐츠를 렌더링함.
    //테마변경 버튼을 누를경우 themecontext로부터 받은 toggleTheme 함수를 호출하여 themecontext의 값을 변경하는 역할도 함.
    //themecontext의 값을 가져오기 위해 useContext Hook 사용
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                padding: "1.5rem",
                backgroundColor: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
            }}
        >
            <p>안녕하세요, 테마 변경이 가능한 웹사이트 입니다.</p>
            <button onClick={toggleTheme}>테마 변경</button>
        </div>
    );
}

export default MainContent;