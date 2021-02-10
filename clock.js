const clockContainer = document.querySelector(".js-clock"),
       clockTitle = clockContainer.querySelector(".cl-time"); //clockContainter(js-clock class)가 있는 곳의 h1을 가져온다
       clockDate = clockContainer.querySelector(".cl-date");

function getTime(){
    const date = new Date(); //저장하는 시점의 Date가 date에 저장됨
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}: ${minutes < 10 ? `0${minutes}` : minutes}: ${seconds < 10 ? `0${seconds}` : seconds}`;
                            //Tenary Operator. or, mini If.
                            //`${if hours가 10보다 작으면? `이렇게출력` : else hours}`
    clockDate.innerText = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDay()}일`;
}

// 제일 먼저 할 것
function init() {
    //현재 시각 얻기
    getTime();
    setInterval(getTime,1000); //setInterval(fn,milsec) : getTime함수를 1000밀리초에 한번씩 실행.
    
}

init();