function getFullYmdStr() {
  //년월일시분초 문자열 생성
  var d = new Date();
  return (
    d.getFullYear() +
    "년 " +
    (d.getMonth() + 1) +
    "월 " +
    d.getDate() +
    "일 " +
    d.getHours() +
    "시 " +
    d.getMinutes() +
    "분 " +
    d.getSeconds() +
    "초 " +
    "일월화수목금토".charAt(d.getUTCDay()) +
    "요일"
  );
}
