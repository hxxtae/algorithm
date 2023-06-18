function solution(n, t, m, timetable) {
  // 함수: 문자열 시간 -> 분단위 시간
  const strToMinute = (str) => {
    const [hh, mm] = str.split(':').map(Number);
    return hh * 60 + mm;
  }
  // 함수: 분단위 시간 -> 문자열 시간
  const minuteToStr = (num) => {
    const m = num % 60;
    const h = (num - m) / 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
  }

  const map = new Map();   // 셔틀버스 운행시간별 탑승자 데이터
  const startMinute = 540; // 09:00
  timetable = timetable.map(strToMinute).sort((a, b) => a - b);
  const len = timetable.length;
  let answer = '';
  let count = 0; // 막차 셔틀 체크 카운트
  for(let i = 0, bus = startMinute; i < n; i++, bus+=t) {
    map.set(bus, []);
    // key: 셔틀 도착 시간
    // value: 셔틀에 탑승한 크루들
  }
  for(const [bus_time, onBus] of map) {
    count++;
    while(timetable.length > 0 && onBus.length < m) {
      const time = timetable[0];
      if(bus_time >= time) onBus.push(timetable.shift());
      else break;
    }
    // 마지막 셔틀
    if(count === map.size) {
      if(onBus.length > 0) {
        if(onBus.length < m) 
          answer = bus_time;
        else 
          answer = onBus.at(-1) - 1;
      }
      else answer = bus_time;
    }
  }
  return minuteToStr(answer);
}

// NOTE: 문제 해결 능력

// [접근]
// ✅게으른 콘의 막차시간을 구하는 문제
// - new Map([ [셔틀 도착 시간, [셔틀에 탑승한 크루들]] ])
// - 각 셔틀 도착 시간에 따른 대기 크루의 탑승 데이터를 set 한다.
// - 탑승 조건: 셔틀 도착 시간 이하의 크루의 대기 시간 및 탑승 가능 인원수

// ※ 콘의 막차시간 set -> 마지막 셔틀버스인 경우에서
// ✔ 대기중인 크루가 존재하는 경우 -> 앞에 대기중인 크루가 셔틀에 타고, 현재 탑승 가능 인원이 남은 경우와 남지 않은 경우
//   - 셔틀에 더이상 탑승할 수 없음
//     -> (이전 크루의 대기 시간 - 1)분
//   - 셔틀에 탑승할 수 있음
//     -> 셔틀 도착시간(셔틀 막차시간)
// ✔ 대기중인 크루가 존재하지 않는 경우
//   -> 셔틀 도착시간(셔틀 막차시간)

// ※ 주의할 점
// 셔틀 인원수 제한에 따른 다음 셔틀에서 이전에 밀린 대기 크루의 탑승도 가능
