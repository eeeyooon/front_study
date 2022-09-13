function slide() {
  let mainNav = document.querySelector("#mainNav");
  let menu = document.querySelector("#navigation");
  let footer = document.querySelector("#footer");

  if (mainNav.style.width === 68 + "px") {
    mainNav.style.width = 265 + "px";
    mainNav.style.overflow = "visible";
    menu.style.width = 245 + "px";
    footer.style.visibility = "visible";
  } else {
    menu.style.width = 55 + "px";
    mainNav.style.width = 68 + "px";
    mainNav.style.overflow = "hidden";
    footer.style.visibility = "collapse";
  }
}

let left = document.querySelector("#left-arrow");
let right = document.querySelector("#right-arrow");

left.addEventListener("click", slide);
right.addEventListener("click", slide);

function open() {
  left.style.visibility = "visible";
  right.style.visibility = "collapse";
}

function close() {
  left.style.visibility = "collapse";
  right.style.visibility = "visible";
  right.style.transform = "translateX(-30px)";
}

right.addEventListener("click", open);
left.addEventListener("click", close);

//메뉴바 접기&펴기 이후 모바일 사이즈가 되면 메뉴바 크기가 작아지는 문제 해결
//모바일 사이즈가 될 땐 메뉴바에 걸린 width를 모두 없애는 코드 추가

const mediaQuery = window.matchMedia("screen and (max-width:550px)");

function handleMobileChange(e) {
  let mainNav = document.querySelector("#mainNav");
  let menu = document.querySelector("#navigation");
  if (e.matches) {
    mainNav.style = "";
    menu.style = "";
  }
}
mediaQuery.addEventListener("change", handleMobileChange);
handleMobileChange(mediaQuery);
