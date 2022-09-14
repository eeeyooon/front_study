// 내보내진 모듈(dataSource.js)을 가져와 사용하기 위해 import
import { dataSource } from "./dataSource.js";
const data = dataSource.data;

//가상의 루트노드 (최상위 노드 3개를 묶어주기 위해)
const rootNode = { isRoot: true, children: [] };

dataToTree(rootNode, data);

const tree2Element = document.getElementById("tree2");
const tree3Element = document.getElementById("tree3");
const tree3ToRoot = document.getElementById("tree3-to-root");
tree3ToRoot.addEventListener("dragover", onDragOverToRootElement);
tree3ToRoot.addEventListener("dragleave", onDragLeaveToRootElement);
tree3ToRoot.addEventListener("drop", onDropToRootElement);

let dragState = {
  currentDragOverElement: null,
  sourceId: null,
};

renderAll(rootNode);

function renderAll(rootNode) {
  console.clear();
  outTreeToConsole(rootNode);
  tree2Element.innerHTML = outTreeToUlElementString(rootNode);
  // -> <div id="tree2">를 outTreeToUlElementString(rootNode)로 변경.

  //Element.innerHTML : 요소(element) 내에 포함된 HTML을 가져오거나 설정함.
  //                    = 해당 노드의 HTML 콘텐츠
  // ex) document.getElementById("id 이름").innerHTML = 변경하고 싶은 내용.

  //element.firstChild : 트리에서 노드의 첫번째 자식이나 null(자식이 없으면)을 반환함.

  //tree3 (Element 동적 생성)
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

//spread
function dataToTree(rootNode, data) {
  const nodeList = data.map((d) => ({ ...d, children: [] }));
  for (const node of nodeList) {
    const parentNode = nodeList.find((n) => node.parentId == n.id);
    //Array.prototype.find() : 주어진 판별 함수를 만족하는 첫번째 요소의 *값*을 반환함. (없으면 undefined 반환)
    if (!parentNode) {
      rootNode.children.push(node);
      //push() : 배열의 마지막에 새로운 요소를 추가한 후, 변경된 배열의 길이 반환
      rootNode.children.sort((a, b) => a.id - b.id);
      //sort() : 기본적으로 배열 내부의 요소를 문자열로 반환한 후 오름차순으로 정렬함.
    } else {
      parentNode.children.push(node);
      parentNode.children.sort((a, b) => a.id - b.id);
    }
  }

  evaluateSeq(rootNode);
  return rootNode;
}

//여기부터 다시

function findNode(rootNode, id) {
  if (!id) return null;
  if (rootNode.id === id) return rootNode;

  for (const node of rootNode.children) {
    const result = findNode(node, id);
    if (result) return result;
  }
  return null;
}

function moveCategory(rootNode, sourceId, targetId) {
  if (sourceId === targetId) return false;
  const sourceNode = findNode(rootNode, sourceId);
  const targetNode = findNode(rootNode, targetId);
  if (isParent(rootNode, targetNode, sourceNode)) return false;
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

function isParent(rootNode, childNode, guessNode) {
  let parent = findNode(rootNode, childNode.parentId);
  while (parent) {
    if (guessNode.id === parent.id) return true;
    parent = findNode(rootNode, parent.parentId);
  }
  return false;
}

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
