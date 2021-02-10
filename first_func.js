const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked";

function handleClick() {
  const hasClass = title.classList.contains(CLICKED_CLASS);
  if (hasClass) {
    // title.className = CLICKED_CLASS; 이렇게하면 원래있던 class까지 다 지워버리게됨
    title.classList.add(CLICKED_CLASS);
  } else{
      title.classList.remove(CLICKED_CLASS); 
  }
}

function init() {
  title.addEventListener("click", handleClick);
  //click대신, mouseenter 등등 - Javascript Event (MDN을 강추!!)
}

init(); //function초기화하기
