// 로컬스토리지에서 값 가져오기
const myUID = JSON.parse(localStorage.getItem("user")).uid;

// 로컬 스토리지에 값 저장하기
//localStorage.setItem("정보이름","값");로컬 스토리지에 저장됨
localStorage.setItem("user", JSON.stringify(user)); //로컬 스토리지에 저장됨
