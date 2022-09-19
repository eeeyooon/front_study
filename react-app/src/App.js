import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";


function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Header(props) {
  console.log("props", props, props.title);
  return (
    <header>
      <h1>
        <a href="/" onClick={(event) => {
            event.preventDefault();
            //preventDefault() :  a 태그가 가지고 있는 기본 동작을 방지함
            // -> 클릭해도 reload가 일어나지 않음.
            //onClick의 함수가 호출됐을때 Header의 props로 전달된
            //onChangeMode가 가리키는 함수를 호출해야함.
            props.onChangeMode();
            //밑에 onChangeMode() 호출
          }}> {props.title}</a></h1>
    </header>
  );
}



function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={"/read/" + t.id} onClick={(event) => {
            //파라미터가 하나인 경우는 괄호 생략해도 상관 x  > event=>{} 가능
            //id는 t.id라고 id값 부여해주기.
            event.preventDefault();
            props.onChangeMode(event.target.id);
            //id 값을 가져오려면 event속성 사용. (그 이벤트를 유발시킨 태그 = 여기서는 a태그)
            //event.target.id = a태그의 id.
      }}>{t.title}</a>
    </li>);
  }
  return <nav>
      <ol>{lis}</ol>
    </nav>
  
}

function App() {
  // const _mode = useState("WELCOME");
  // //이 지역 변수를 상태로 업그레이드 시킴.
  // //useState은 배열을 리턴함. 여기서 0번째 원소는 상태의 값을 읽을 때 쓰는 데이터, 1번째 데이터는
  // //그 상태의 값을 변경할 때 사용하는 함수임.

  // const mode = _mode[0]; //이 mode의 값을 통해서 상태의 값을 읽을 수 있음.
  // const setMode = _mode[1]; //이 1번째 원소인 setMode를 통해 mode의 값을 바꿀 수 있음.

  //위 코드들을 줄이면 바로 다음 코드가 됨.
  const [mode, setMode] = useState("WELCOME");

  const [id, setId] = useState(null);

  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];
  //mode의 값이 뭐냐에 따라 본문의 내용이 달라짐.

  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title="Read" body="Hello, Read"></Article>;
  }

  //app()함수는 한번만 실행되기 때문에 리턴값이 달라지지 않는 것임.
  // -> mode의 값이 바뀌면 App()이 새로 실행되고, 리턴값이 달라지면 그 값대로 UI가 달라지게 하려면
  // => 이때 state 사용.
  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          //함수의 첫번째 파라미터 값으로 id. > 경고창으로 id 띄우기.
          //alert(id);
          setMode("READ");
          setId(_id);
          //내부 컴포넌트의 글을 클릭할때 id 값이 바뀌면 컴포넌트가 새로 실행되면서 id값이 새로 지정됨.
        }}
      ></Nav>
      {content}
    </div>
  );
}

export default App;
