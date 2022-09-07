function slide() {
    const mainNav = document.querySelector('#mainNav')
    const menu = document.querySelector('#navigation')
    const footer = document.querySelector('#footer')
    
    
    //메뉴바 펼치기
    if(mainNav.style.width === 68 + 'px') {
        mainNav.style.width = 248 + 'px';
        mainNav.style.overflow = 'visible';
        menu.style.width = 245 + 'px';
        footer.style.visibility = 'visible';

    }

    //메뉴바 닫기
    else {
        menu.style.width = 55 + 'px';
        mainNav.style.width = 68 + 'px';
        mainNav.style.overflow = 'hidden';
        footer.style.visibility = 'collapse';
 
    }
}



let left = document.querySelector('#left-arrow');
let right = document.querySelector('#right-arrow')


//화살표를 클릭하면 메뉴바가 열리고, 닫힘.
left.addEventListener("click", slide)
right.addEventListener("click", slide)


//메뉴바를 열었을 때 (default)
function open() {

    //왼쪽 화살표는 보이고, 오른쪽 화살표는 안보임.
    left.style.visibility = 'visible';
    right.style.visibility = 'collapse';
}


//메뉴바를 닫았을 때 
function close() {
    
    //왼쪽 화살표는 안보이고, 오른쪽 화살표는 보임.
    left.style.visibility = 'collapse';
    right.style.visibility = 'visible';

    // 오른쪽 화살표가 왼쪽 화살표 위치로 
    right.style.transform = 'translateX(-20px)';
    
}



//오른쪽 화살표를 클릭하면 왼쪽 화살표로
right.addEventListener("click", open)

//왼쪽 화살표를 클릭하면 오른쪽 화살표로 바뀜.
left.addEventListener("click", close)