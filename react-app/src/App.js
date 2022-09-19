// import logo from "./logo.svg";
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
  // console.log("props", props, props.title);
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
            props.onChangeMode(Number(event.target.id));
            //id 값을 가져오려면 event속성 사용. (그 이벤트를 유발시킨 태그 = 여기서는 a태그)
            //event.target.id = a태그의 id.

            //숫자라도 태그의 속성으로 넘기면 문자가됨. event.target.id> 문자열 id가 됨. 그래서 문자>숫자로 형변환해주는 Number함수 사용.
      }}>{t.title}</a>
    </li>);
  }
  return <nav>
      <ol>{lis}</ol>
    </nav>
  
}


//Create 컴포넌트 만들기
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
        event.preventDefault(); //submit될때 페이지가 리로드가 되는걸 막음.
        const title = event.target.title.value;
        //event.target -> event가 발생한 태그 = form태그
        //event.target.title.value; -> form태그의 (name이 title)title의 value값
        const body = event.target.body.value;

        //그렇게 가져온 title, body를 Create 컴포넌트 사용자(<Create></Create>)에게 공급해줘야함. 
        //사용자는 onCreate를 통해 공급받음.
        props.onCreate(title, body); //onCreate()호출 -> 실행되면 

    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"/></p>
    </form>
  </article>
}


//Update컴포넌트 만들기
function Update(props) {
  //props → state로 환승. (내부에서 자유롭게 사용할 수 있는 state값으로 변경해줌.)
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
  <h2>Update</h2>
  <form onSubmit={event=>{
      event.preventDefault(); 
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);

  }}>
    <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
      //onChange() : 값을 입력할때마다 호출됨.

      //console.log(event.target.value); //마지막에 바꾼 값만 콘솔에 찍힘.
      //우리가 알아낸, 가장 최근에 변경된 값을 새로운 state로 바꿔야함.
      //setTitle()을 사용해서 최근에 변경된 값을 새로운 타이틀로 변경할 것.
      setTitle(event.target.value);

      //props로 들어온 타이틀에서 state로 갈아탐. 그 state를 value값으로 줌. state는 컴포넌트 안에서 변경가능
      //onchange에서 새로운 value로 키보드를 입력할때마다 setTitle의 값으로 지정. 그때마다 title 값이 바뀌고 
      //컴포넌트가 다시 렌더링되면서 그 새로운 값이 value값으로 들어오고 또 값이 바뀌고 또 들어오고.

    }}/></p>
    <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
      setBody(event.target.value);
    }}></textarea></p>
    <p><input type="submit" value="Update"/></p>

  </form>
</article>
}

function App() {
  // const _mode = useState("WELCOME"); //상태를 만듦 > 그 리턴값을 _mode에 담음.
  // //이 지역 변수를 상태로 업그레이드 시킴.
  // //useState은 배열을 리턴함. 여기서 0번째 원소는 상태의 값을 읽을 때 쓰는 데이터, 1번째 데이터는
  // //그 상태의 값을 변경할 때 사용하는 함수임.

  // const mode = _mode[0]; //이 mode의 값을 통해서 상태의 값을 읽을 수 있음.
  // const setMode = _mode[1]; //이 1번째 원소인 setMode를 통해 mode의 값을 바꿀 수 있음.

  //위 코드들을 줄이면 바로 다음 코드가 됨.
  const [mode, setMode] = useState("WELCOME");

  //우리가 어떤 토픽을 골랐는지의 state도 저장해야 함.
  const [id, setId] = useState(null);

  //id값 따로 관리
  const [nextId, setNextId] = useState(4); //초기값은 새로 생성될 id값. 

  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);

  //mode의 값이 뭐냐에 따라 본문의 내용이 달라짐.
  let content = null;
  let contextControl = null; //맥락적으로 노출되는 UI. > read가 mode일 때만 노출.


  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === "READ") {
    let title, body = null;
    for (let i = 0; i<topics.length; i++) {
      //topics원소의 숫자만큼 반복

      //console.log(topics[i].id, id);

      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    //mode가 read일때만 update(contextcontrol) 보이게
    contextControl = <>
      <li><a href={"/update/"+ id} onClick={event=>{
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={event=>{
        //button타입은 기본 동작이 없기때문에 preventEvent안해도 됨.
        //우리가 삭제할 대상 > topics 데이터

        const newTopics = []
        for(let i=0; i<topics.length; i++){
          if(topics[i].id !== id){
            //현재 id와 topics의 id가 일치하지 않으면
            newTopics.push(topics[i]);
            //newTopics는 원본데이터와는 다른 데이터임. 거기에 push를 해서 새로운 topics를 만듦.
            //delete를 누른 토픽 제외 나머지 토픽만 있는 새로운 topics가 만들어지고 그걸 새로 setting함.
            //그럼 delete된 토픽만 사라짐.

          } 
        }
        setTopics(newTopics);
        setMode('WELCOME');
        
      }} /></li>
    </>


  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
        //사용자(Create)는 onCreate를 통해 title, body를 받음. -> Create컴포넌트에서 onCreate()호출
        //사용자가 입력한 title, body를 가지고 topics에 원소 추가를 해야함. => 그러려면 topics를 상태(state)로 승격해야함.

        //topics에 들어가살 새로운 원소 -> 객체 생성
        const newTopic = {id:nextId, title:_title, body:_body} //(1)title: 객체의 프로퍼티 이름, (2)_title:파라미터로부터 온 이름. 
        
        const newTopics = [...topics] //topics의 복제본
        newTopics.push(newTopic); //그 복제본에 push를 해서 복제본을 변경
        setTopics(newTopics); //복제본을 topics로 전달. > 그럼 리액트가 원본 데이터와 복제본을 비교하고, 값이 다르다면 그때 컴포넌트를 재실행함.
        
        //글을 추가했을 때 상세보기 페이지로 이동할 수 있게 설정
        setMode('READ');
        setId(nextId);

        //다음 글을 추가할때를 대비해서 기존 nextId값 +1
        setNextId(nextId+1);

    }}></Create>
  } else if(mode === 'UPDATE'){
    let title, body = null;
    for (let i = 0; i<topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      //update버튼을 클릭했을때
      //console.log(title, body); 변경된값 잘 출력됨.

      
      //우리가 바꾸려는 topics는 배열이라는 객체니까, 그냥 수정하면 안됨.
      const newTopics = [...topics]

      //우리가 업데이트는, read를 한 상태에서만 실행되기 때문에
      //id는 자동으로 세팅되어있음.
      //수정할 토픽
      const updatedTopic = {id:id, title:title,  body:body}
      for(let i=0; i<newTopics.length; i++) {
        if(newTopics[i].id === id){
          //newtopics의 id와 현재 id가 같다면 우리가 선택한 토픽.
          
          //우리가 선택한 토픽을 업데이트된 토픽으로 교체.
          newTopics[i] = updatedTopic;

          //그 다음엔 볼일이 끝났으니
          break;
        }
      }

      //새로운 토픽을 저장해줌.
      setTopics(newTopics);
      //업데이트된 토픽의 상세보기로 이동.
      setMode('READ');


    }}></Update>
  }

  //app()함수는 한번만 실행되기 때문에 리턴값이 달라지지 않는 것임.
  // -> mode의 값이 바뀌면 App()이 새로 실행되고, 리턴값이 달라지면 그 값대로 UI가 달라지게 하려면
  // => 이때 state 사용.
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
          //이벤트가 발생했을때 mode의 값을 변경해줌.
          setMode("WELCOME");
        }}
      ></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
          //함수의 첫번째 파라미터 값으로 id. > 경고창으로 id 띄우기.
          //alert(id);
          setMode("READ");
          setId(_id);
          //Nav 컴포넌트의 글을 클릭할때 id 값이 바뀌면 컴포넌트가 새로 실행되면서 id값이 새로 지정됨.
        }}
      ></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event=>{
            event.preventDefault();
            setMode('CREATE');
          }}>Create</a></li>
          {contextControl}
      </ul>

    </div>
  );
}

export default App;
