// 내보내진 모듈(dataSource.js)을 가져와 사용하기 위해 import
import { dataSource } from "./dataSource.js";
const data = dataSource.data;

//가상의 루트노드 (최상위 노드 3개를 묶어주기 위해)
const rootNode = { isRoot: true, children: [] };

//dataSource.js로부터 넘겨받은 data를 가지고 tree 만들기
dataToTree(rootNode, data);

const tree2Element = document.getElementById("tree2");
const tree3Element = document.getElementById("tree3");
const tree3ToRoot = document.getElementById("tree3-to-root");
tree3ToRoot.addEventListener("dragover", onDragOverToRootElement);
tree3ToRoot.addEventListener("dragleave", onDragLeaveToRootElement);
tree3ToRoot.addEventListener("drop", onDropToRootElement);

//drag는 한곳에서만(한명이) 일어나니까 그냥 글로벌 변수로
let dragState = {
  currentDragOverElement: null,
  sourceId: null,
};

//렌더링작업은 계속 해줌. 렌더링 작업을 할때마다 새로 화면을 그리는 것이라 비효율적으로 보이지만 -> 컴퓨터의 성능상 그정도 속도는 느리지도 않고,
//이렇게 렌더링 작업을 따로 해주는 덕분에 데이터를 계산하는 로직과 화면을 그리는 로직의 분리가 가능함 => 유지보수 및 코드 재사용성에 굉장히 유용함.
renderAll(rootNode);

//총 세가지 샘플을 렌더링함. (console, HTML엘리멘트-innerHTML, 엘리멘트 동적생성)
function renderAll(rootNode) {
  //1. console
  console.clear();
  outTreeToConsole(rootNode);

  //2. HTML Element-innerHTML
  tree2Element.innerHTML = outTreeToUlElementString(rootNode);

  // -> <div id="tree2">를 outTreeToUlElementString(rootNode)로 변경.

  //Element.innerHTML : 요소(element) 내에 포함된 HTML을 가져오거나 설정함.
  //                    = 해당 노드의 HTML 콘텐츠
  // ex) document.getElementById("id 이름").innerHTML = 변경하고 싶은 내용.

  //element.firstChild : 트리에서 노드의 첫번째 자식이나 null(자식이 없으면)을 반환함.

  //3. Element 동적 생성
  while (tree3Element.firstChild) {
    tree3Element.firstChild.remove();
    //tree3Element.firstChild를 지우고
  }
  tree3Element.appendChild(outToUlElement(rootNode));
  //tree3Element에 자식 노드를 추가

  //Node.appendChild()
  //: 한 노드를 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙임.
}

//createElement(): 요소를 만드는 메소드

//드래그 앤 드롭 이벤트 (마우스로 객체를 드래그해서 놓을 때까지 여러 단계의 이벤트가 순차적으로 발생함.)
//dragstart : 사용자가 객체(object)를 드래그하려고 할 때 발생.
//dragover : 드래그하면서 마우스가 대상 객체의 위에 자리 잡고 있을 때 발생함.
//dragleave : 드래그가 끝나서 마우스가 대상 객체의 위에서 벗어날 때 발생함.
//drop : 드래그가 끝나서 드래그 하던 객체를 놓는 장소에 위치한 객체에서 발생함.
function outToUlElement(rootNode) {
  if (rootNode.children <= 0) {
    const liElement = document.createElement("li");
    liElement.draggable = true; //드래그 가능

    liElement.addEventListener("dragstart", onDragLiElement);
    liElement.addEventListener("dragover", onDragOverLiElement);
    liElement.addEventListener("dragleave", onDragLeaveLiElement);
    liElement.addEventListener("drop", onDropLiElement);

    // Document.createTextNode() : 텍스트 노드 생성. (문자열을 데이터로)
    const spanTextElement = document.createElement("span");
    spanTextElement.appendChild(document.createTextNode(rootNode.name));
    liElement.appendChild(spanTextElement);
    const upButtonElement = document.createElement("button");
    upButtonElement.appendChild(document.createTextNode("▲"));
    upButtonElement.addEventListener("click", () => onCategorySeqUp(rootNode));
    liElement.appendChild(upButtonElement);
    const downButtonElement = document.createElement("button");
    downButtonElement.appendChild(document.createTextNode("▼"));
    downButtonElement.addEventListener("click", () =>
      onCategorySeqDown(rootNode)
    );
    liElement.appendChild(downButtonElement);
    liElement.id = rootNode.id;
    return liElement;
  }

  const rootElement = document.createElement(rootNode.isRoot ? "ul" : "li");
  if (!rootNode.isRoot) {
    rootElement.draggable = true;

    //선택한 노드가 루트 노드가 아니면 드래그 가능?

    //draggable : 요소의 드래그 가능 여부를 나타내는 열거형 특성으로, true 또는 false의 지정이 필수임.

    rootElement.addEventListener("dragstart", onDragLiElement);
    rootElement.addEventListener("dragover", onDragOverLiElement);
    rootElement.addEventListener("dragleave", onDragLeaveLiElement);
    rootElement.addEventListener("drop", onDropLiElement);
    const spanTextElement = document.createElement("span");
    spanTextElement.appendChild(document.createTextNode(rootNode.name));
    rootElement.appendChild(spanTextElement);
    const upButtonElement = document.createElement("button");
    upButtonElement.appendChild(document.createTextNode("▲"));
    upButtonElement.addEventListener("click", () => onCategorySeqUp(rootNode));
    rootElement.appendChild(upButtonElement);
    const downButtonElement = document.createElement("button");
    downButtonElement.appendChild(document.createTextNode("▼"));
    downButtonElement.addEventListener("click", () =>
      onCategorySeqDown(rootNode)
    );
    rootElement.appendChild(downButtonElement);
    rootElement.id = rootNode.id;
  }

  const childrenUlElement = rootNode.isRoot
    ? rootElement
    : document.createElement("ul");

  if (!rootNode.isRoot) rootElement.appendChild(childrenUlElement);

  for (const node of rootNode.children) {
    childrenUlElement.appendChild(outToUlElement(node));
  }

  return rootElement;
}

function outTreeToConsole(rootNode, level = 0) {
  if (!rootNode.isRoot) console.log(`${" ".repeat(level)}${rootNode.name}`);
  level++;
  for (const node of rootNode.children) {
    outTreeToConsole(node, level);
  }
}

//<div id="tree2">
function outTreeToUlElementString(rootNode) {
  let elementString = "";

  if (rootNode.children <= 0) return `<li>${rootNode.name}</li>`;

  for (const node of rootNode.children) {
    elementString += outTreeToUlElementString(node);
  }
  elementString = rootNode.isRoot
    ? `<ul>${elementString}</ul>`
    : `<li>${rootNode.name}<ul>${elementString}</ul></li>`;
  return elementString;
}

//dataSource의 data -> map한 다음에 nodeList로.

//spread 문법 (...) 체크
function dataToTree(rootNode, data) {
  //datasource의 data에다가 children 배열을 추가하여 "nodelist"라는 새로운 배열 생성함.
  const nodeList = data.map((d) => ({ ...d, children: [] }));
  for (const node of nodeList) {
    const parentNode = nodeList.find((n) => node.parentId == n.id);

    //부모의 id와 노드의 id가 같은 노드들만 찾아서 parentNode에 넣기

    //Array.prototype.find() : 주어진 판별 함수를 만족하는 첫번째 요소의 *값*을 반환함. (없으면 undefined 반환)
    if (!parentNode) {
      //parentNode가 유효하지 않으면(부모의 id와 노드의 id가 같지 않은 노드들)
      rootNode.children.push(node); //루트노드의 자식 노드로 추가하기
      //push() : 배열의 마지막에 새로운 요소를 추가한 후, 변경된 배열의 길이 반환
      rootNode.children.sort((a, b) => a.id - b.id);

      //추가하고 나서 정렬하기 (굳이 안해도 되지만)

      //sort() : 기본적으로 배열 내부의 요소를 문자열로 반환한 후 오름차순으로 정렬함.
    } else {
      //나머지 노드들은 parentNode의 자식 노드로 추가하기 > 정렬하기
      parentNode.children.push(node);
      parentNode.children.sort((a, b) => a.id - b.id);
    }
  }

  //seq 다시 계산해서 정리하기 (여기선 굳이 안해도 됨. 순서의 변화가 있을 가능성이 있는 함수에만해도)
  evaluateSeq(rootNode);
  return rootNode;
}

//id를 가지고 해당 id를 갖는 node 찾는 함수. (재귀함수)
function findNode(rootNode, id) {
  if (!id) return null;
  if (rootNode.id === id) return rootNode;

  for (const node of rootNode.children) {
    const result = findNode(node, id);
    if (result) return result;
  }
  return null;
}

//소스노드는 드래그를 당한 요소, 타겟은 드래그오버를 당한 (드래그의 영역으로 존재하는) 요소를 가리킴. -> 헷갈리면 그냥 console.log or debug로 찍어봐
function moveCategory(rootNode, sourceId, targetId) {
  if (sourceId === targetId) return false;
  //sourceId와 targetId가 같다는 건 두 요소가 동일하다는 거니까 변화 x

  const sourceNode = findNode(rootNode, sourceId);
  const targetNode = findNode(rootNode, targetId);

  //노드들이 부모노드인지 확인해야함.
  if (isParent(rootNode, targetNode, sourceNode)) return false;

  //이전 부모 노드였는지 확인.
  const oldParentNode = sourceNode.parentId
    ? findNode(rootNode, sourceNode.parentId)
    : rootNode;
  oldParentNode.children = oldParentNode.children.filter(
    (n) => n.id !== sourceId
  );

  //filter() : 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환함.

  sourceNode.parentId = targetNode.id;
  targetNode.children.push(sourceNode);
  return true;
}

//노드가 부모 노드인지 확인하는 함수
function isParent(rootNode, childNode, guessNode) {
  let parent = findNode(rootNode, childNode.parentId);
  while (parent) {
    if (guessNode.id === parent.id) return true;
    parent = findNode(rootNode, parent.parentId);
  }
  return false;
}

//seq 다시 계산해서 정리하기 (재귀함수)
//계속 반복을 통해 처음부터 끝까지 seq를 새로 정리해줌. (함수가 실행될때마다 count값이 증가하고, 그 count값이 곧 seq가 됨.)
function evaluateSeq(rootNode) {
  let count = 0;
  (function innerEvaluateSeq(rootNode) {
    rootNode.seq = count++;
    for (const node of rootNode.children) {
      innerEvaluateSeq(node);
    }
  })(rootNode);
}

//DataTransfer
//: 드래그 앤 드롭 동작 중에 끌고 있는 데이터를 보유하기 위해 사용됨.

//setData() : setData()에 데이터 타입을 지정한 데이터를 추가하여 데이터 타입을 설정함.
//첫번째 매개변수로 포맷 문자열 지정, 그 포맷과 일치하는 값을 두번째 매개변수로 지정.

function onDragLiElement(event) {
  event.dataTransfer.setData("sourceId", event.target.id);
  dragState.sourceId = event.target.id;
}

function onDragOverLiElement(event) {
  event.preventDefault();
  //어떤 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 브라우저의 기본 동작을 실행하지 않도록 지정.
  event.stopPropagation();
  // 현재 이벤트가 캡처링/버블링 단계에서 더 이상 전파되지 않도록 방지. (전파를 방지해도 이벤트의 기본 동작은 실행됨.)

  // ***
  // => preventDefault()는 브라우저 고유의 행동을 막아주는 함수라면,
  //    stopPropagtion()은 부모 요소로의 이벤트 전달을 막아주는 함수임.

  const targetElement = event.target;
  // event.target : 이벤트가 발생한 대상 객체를 가리킴. (이 속성을 사용하여 이벤트 위임을 구현할 수 있음.)
  const targetLiElement = targetElement.closest("li");

  //Element.closest() : 주어진 CSS 선택자와 일치하는 요소를 찾을 때까지, 자기 자신을 포함해
  //                    위쪽(부모 방향, 문서 루트까지)으로 문서 트리를 순회함.
  // closest(selectors) -> selectors : CSS 선택자 문자열
  // -> 반환값 : selectors에 일치하는 가장 가까운 조상 Element 또는 자기 자신, 일치요소 없으면 null

  targetLiElement.classList.add("on-drag");
  //drag한 상태에선 배경색 lightskyblue 바꾸는 css 추가

  //Element.classList.add() : 지정한 클래스 값을 추가함.

  dragState.currentDragOverElement = targetLiElement;
}

function onDragLeaveLiElement(event) {
  event.preventDefault();
  event.stopPropagation();
  if (dragState.currentDragOverElement)
    dragState.currentDragOverElement.classList.remove("on-drag");
  //"on-drag" 클래스 제거.

  //Element.classList.remove() : 지정한 클래스 값을 제거함.
}

function onDropLiElement(event) {
  event.preventDefault();
  event.stopPropagation();
  if (dragState.currentDragOverElement)
    dragState.currentDragOverElement.classList.remove("on-drag");

  const sourceId = parseInt(dragState.sourceId);
  const targetId = parseInt(event.target.closest("li").id);
  if (moveCategory(rootNode, sourceId, targetId, dragState.up)) {
    evaluateSeq(rootNode);
    renderAll(rootNode);
  }
}

//노드를 끌어서 "제일위로"로 옮겼을때
function onDragOverToRootElement(event) {
  event.preventDefault();
  event.stopPropagation();
  const targetElement = event.target;
  targetElement.className = "";
  // Element.className : 특정 element의 클래스 속성의 값을 가져오거나 설정할 수 있음.
  targetElement.classList.add("tree3-to-root-hover");

  //hover시 배경색 바뀌는 css 추가
}

function onDragLeaveToRootElement(event) {
  event.preventDefault();
  event.stopPropagation();
  const targetElement = event.target;
  targetElement.className = "";
  targetElement.classList.add("tree3-to-root-normal");
}

function onDropToRootElement(event) {
  event.preventDefault();
  event.stopPropagation();
  const sourceId = parseInt(dragState.sourceId);
  const sourceNode = findNode(rootNode, sourceId);
  const parentNode = findNode(rootNode, sourceNode.parentId);
  if (parentNode) {
    parentNode.children = parentNode.children.filter((n) => n.id !== sourceId);
    //filter() : 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환함.
  }

  if (sourceNode.parentId) {
    rootNode.children.push(sourceNode);
    sourceNode.parentId = null;
    evaluateSeq(rootNode);
    renderAll(rootNode);
  }

  const targetElement = event.target;
  targetElement.className = "";
  targetElement.classList.add("tree3-to-root-normal");
}

//위아래 화살표 버튼을 눌렀을때 (🔼: sequp / 🔽: seqdown)

function onCategorySeqUp(node) {
  const parentNode = node.parentId
    ? findNode(rootNode, node.parentId)
    : rootNode;
  const nodeIndex = parentNode.children.findIndex((n) => n.id === node.id);
  //Array.prototype.findIndex() : 주어진 판별 함수를 만족하는 배열의 첫번째 요소에 대한 인덱스를 반환.
  // 만족하는 요소가 없으면 -1을 반환함.

  if (nodeIndex <= 0) return;
  const temp = parentNode.children[nodeIndex - 1];
  parentNode.children[nodeIndex - 1] = node;
  parentNode.children[nodeIndex] = temp;
  evaluateSeq(rootNode);
  renderAll(rootNode);
}

function onCategorySeqDown(node) {
  const parentNode = node.parentId
    ? findNode(rootNode, node.parentId)
    : rootNode;
  const nodeIndex = parentNode.children.findIndex((n) => n.id === node.id);
  if (nodeIndex >= parentNode.children.length - 1) return;
  const temp = parentNode.children[nodeIndex + 1];
  parentNode.children[nodeIndex + 1] = node;
  parentNode.children[nodeIndex] = temp;
  evaluateSeq(rootNode);
  renderAll(rootNode);
}
