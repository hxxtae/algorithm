// 풀이 1.
function solution1(book_time) {
  const len = book_time.length;
  const map = new Map(); // [방번호, [예약시간, 예약시간, ...]]
  const transMin = (s, m) => (60 * parseInt(s)) + parseInt(m);
  book_time = book_time.map(([start, end]) => {
    start = transMin(...start.split(':'));
    end = transMin(...end.split(':'));
    return [start, end];
  }).sort((a, b) => a[0] - b[0]);
  for(let i = 0; i < len; i++) {
    const [start, end] = book_time[i];
    if(map.size === 0) {
      map.set(1, [[start, end]]);
      continue;
    }
    let confirm = true;
    for(let n = 1; n <= map.size; n++) {
      confirm = true;
      const times = map.get(n);
      for(const [s, e] of times) {
        if(end <= (s - 10) || start >= (e + 10)) {
          continue;
        } else {
          confirm = false;
          break;
        }
      }
      if(confirm) {
        map.get(n).push([start, end]);
        break;
      }
    }
    if(!confirm) {
      const addKey = map.size + 1;
      map.set(addKey, [[start, end]]);
    }
  }
  return map.size;
}

// NOTE: 해시

// 풀이 2.
function transMin(time) {
  const [hour, min] = time.split(":").map(v => Number(v));
  return hour * 60 + min;
}

function solution2(book_time) {
  const timeArr = Array.from({ length: transMin('23:59') + 10 }, () => 0);

  book_time.forEach((time, i) => {
    const [s, e] = time;
    let start = transMin(s);
    const end = transMin(e) + 9;

    for (start; start <= end; start++) {
      timeArr[start]++;
    }
  });

  return Math.max(...timeArr);
}

// NOTE: 배열

// [접근]
// 예약시간의 쌓임을 24시간의 배열로 나타내고,
// 모든 예약시간을 1분 단위로 배열에 중복하여 카운트 하면
// 배열의 중복된 카운트의 가장 큰 수가 방의 수가 될 수 있다.