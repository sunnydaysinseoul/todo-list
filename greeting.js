const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
     SHOWING_CN = "showing";
     // "The purpose is to save a string on a variable so I don't have to write the string and maybe make a mistake.""

//local Storage에 name을 저장하기 위한 함수   
function saveName(text){
    localStorage.setItem(USER_LS,text)

}

//이름을 입력하고 엔터(submit)시 실행할 함수. paintGreeting에 text값을 넣어줄 목적
function handleSubmit(event){
    event.preventDefault(); //event의 기본 동작: 실행 시에 다른 것들을 거쳐서 document까지 영향을 주고나서 페이지를 새로고침 함
    const currentValue = input.value;
    // console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

//form을 display:block으로 바꾸고 이름을 가져올 evenLtistner기능
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

//시작할 때 저장된 currentUser가 있으면 실행할 함수    
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `안녕하세요, ${text}!😊`;
}


//시작할 때 localStorage의 이름 여부를 조회하는 함수
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  // Local storage : a Way that can save small pieces of information in user's computer/browser
  // -> F12-Application-Local Storage에서 확인, 조작가능.
  // (local storage works based on URLs)
  if (currentUser === null) {
    //저장 된 currentUser가 없을 때
    askForName();
  } else {
    //local storage에 user가 저장되어 있을 때
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();
