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
