function solution(record) {
  const map = new Map();
  const message = [];
  for(let i = 0, len = record.length; i < len; i++) {
    const [state, id, name] = record[i].split(' ');
    if(state === "Leave") {
      message.push([id, 0])
      continue;
    }
    if(state === "Enter") message.push([id, 1]);
    map.set(id, name);
  }
  const result = message.map(([id, state]) => {
    return `${map.get(id)}님이 ${state ? "들어왔습니다." : "나갔습니다."}`
  });
  return result;
}

// NOTE: 탐색 / 해시

// [접근]
// 다음 두 가지 경우로 나누어 생각할 수 있다.
// 1. record 배열을 탐색하면서 해시값으로  [유저아이디] : [닉네임] 을 저장한다.
// 2. message란 새로운 배열을 만들어 record의 값 중 ‘Enter”, ”Leave”인 경우 message에 기록을 남긴다.

// 1번의 경우
// “Enter” 와 “Change” 인 경우에만 해시에 접근하여 [유저아이디]에 대한 [닉네임]을 설정하거나 변경된 [닉네임]을 수정한다. 
// 즉 key값에 대한 value값을 해시 값으로 설정한다.

// 2 번의 경우
// “Enter”의 경우 배열의 형태로 [유저아이디, 1]를 message에 push
// “Leave”의 경우 배열의 형태로 [유저아이디, 0]를 message에 push
// message를 루프하면서 유저아이디는 해시를 참고하여 닉네임을, 1이면 “들어왔습니다.“ 0 이면 ”나갔습니다.”를 출력한다.