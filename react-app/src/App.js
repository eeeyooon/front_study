import logo from "./logo.svg";
import "./App.css";

function Header(props) {
  console.log("props", props, props.title);
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            //preventDefault() :  a 태그가 가지고 있는 기본 동작을 방지함
            // -> 클릭해도 reload가 일어나지 않음.
            //onClick의 함수가 호출됐을때 Header의 props로 전달된
            //onChangeMode가 가리키는 함수를 호출해야함.
            props.onChangeMode();
            //밑에 onChangeMode() 호출
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a href={"/read/" + t.id}>{t.title}</a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];
  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          alert("Header");
        }}
      ></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
