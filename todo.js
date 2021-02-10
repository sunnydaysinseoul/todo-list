const toDoForm = document.querySelector(".js-todoForm"),
     toDoInput = toDoForm.querySelector("input"),
     toDoList = document.querySelector(".js-todoList");

const TODOS_LS = 'toDos';

let toDos = []; //입력한 toDo를 localStorage에 넣을 때 Array로 넣어야 하니까 먼저 빈 array생성



function deleteToDo(event){
    const btn = event.target; //<li id=n>을 가진 parentNode라는 건 console.log(even.target) 결과에서 찾아낸 것!
    const li = btn.parentNode; //event 생성(클릭)시 누르는 타겟btn의 li를 읽어와서
    toDoList.removeChild(li);  //                     removeChild로 <li>를 지워주기
    const cleanToDos = toDos.filter(function filterFn(toDo){ //Array의 foreach처럼 하나씩 실행하는 함수를 만들 것
                                            //filter가 하는 일 : Array의 모든 아이템을 받아 함수를 실행하고,
                                            //                  그 함수에서 true인 아이템만 받아서 새로운 array를 만들어 줌.
                                        return toDo.id !== parseInt(li.id) //여기에서 toDo.id는 숫자고, li.id는 string로 인식되어서, parseInt로 숫자를 string으로 바꿔줌.
                                     }) 
                                                 
    toDos = cleanToDos //지우고 남은 걸로 만든 새로운 toDos를 저장하고
    saveToDos();       //       saveToDos()함수로 다시 localStorage에 저장하기.
}

function saveToDos(){
    // localStorage.setItem(TODOS_LS,toDos);
    //Javascript는 localStorage에 Array를 바로 저장하지 못함.
    //(확인해보면 [object Object],[object Object] 이런식으로 저장됨)
    //그래서 JSON.stringify를 이용해 JS object를 string으로 변환해서 저장하기로 함.
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text){ //handleSubmit() 내부에서 함께 실행될 함수
    // console.log(text);
    const li = document.createElement("li"); //li생성하기
    li.className = "toDoLi";
    const delBtn = document.createElement("button"); //button생성하기
    delBtn.className = "delBtnCN";
    const newId = toDos.length + 1; //li마다 id를 가질것임!
    const span = document.createElement("span");
    span.innerText = text; //handleSubmit()에서 받아온 text값을 span안에 넣기.
    delBtn.innerHTML = "✖"; //button의 모양 바꾸기
    delBtn.addEventListener("click",deleteToDo); //delBtn버튼을 click하는 event가 일어날 때 deleteToDo()함수를 실행하기.
    li.appendChild(delBtn);
    li.appendChild(span); //parent(li)에 span값을 넣는 것
    li.id = newId; //입력시마다 <li id="n"> n이 1씩 증가함

    toDoList.appendChild(li); //delBtn,span(text)을 toDoList 자리에 추가하기

    const toDoObj = { //array안에 넣어 줄 Object(dictionary)생성
        text: text, //input에서 submit해온 값
        id: newId //입력할 때 마다 1씩 증가하며 id가 들어감.
    };
    toDos.push(toDoObj); //push: array안에 object값 넣기
    saveToDos(); //지금까지의 toDos를 localStorage에 저장하기
}
    
function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue); //input값을 받아서 paintToDo함수에 넣고 돌려주기
    toDoInput.value = ""; //엔터치면 input창 비우기
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){
        // console.log(loadedToDos); //JSON으로 Object를 String으로 변환해 저장했으니 가져올때는 반대로!
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos); //parsed전과 후 비교

        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text)
        });
            //forEach : Array에 담겨있는 각각에 대해 함수를 실행해 주는 array함수
            //여기서는 외부 함수를 안불러오고 forEach안에서 함수 생성해줌.
    }
}     


function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}
init();