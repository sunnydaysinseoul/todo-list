const body = document.querySelector("body");

const IMG_NUMBER = 12; //우리가 사용할 배경 이미지의 개수


function paintImage(imgNumber){ //body에 image라는 값을 넣어줄건데, 이때 src를 random number이용해서 bg3.jpg 이런식으로 설정
    const image = new Image(); // It is the same as doing const img = document.createElement("img")
    image.src = `img/pl${imgNumber}.jpg`;
    body.prepend(image); //appendChild로 하면 사진이 글씨 뒤로 안감..
    image.classList.add('bgImage'); //css조정위해 class추가

}

function genRandom(){ //IMG_NUMBER수 이내에서 랜덤숫자 추출하는 함수
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number; //return을 해야 해당 함수가 실행 후 중단됨
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();