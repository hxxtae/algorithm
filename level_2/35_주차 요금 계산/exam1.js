// 풀이 1.
function solution1(fees, records) {
  const mapA = new Map(); // 모든 차량 입차 시간
  const mapB = new Map(); // 모든 차량 총 주차 시간(분)
  for(let i = 0, len = records.length; i < len; i++) {
    const [timeStr, car, state] = records[i].split(' ');
    if(state === "IN") {
      mapA.set(car, timeStr);
      continue;
    }
    const minute = getMinute(mapA.get(car), timeStr);
    mapB.set(car, (mapB.get(car) || 0) + minute);
    mapA.delete(car);
  }
  if(mapA.size) {
    const finalTime = "23:59";
    for(let [car, time] of mapA) {
      const minute = getMinute(time, finalTime);
      mapB.set(car, (mapB.get(car) || 0) + minute);
    }
  }
  for(let [car, minute] of mapB) {
    const price = getAddPrice(minute, fees);
    mapB.set(car, price);
  }
  return [...mapB].sort(([a_key, a_val], [b_key, b_val]) => a_key - b_key).map(([car, price]) => price);
}

function getMinute(startTime, endTime) {
    const [sHH, sMM] = startTime.split(':').map(Number);
    const [eHH, eMM] = endTime.split(':').map(Number);
    if(sHH === eHH) return eMM - sMM;
    return (eHH - sHH) * 60 - sMM + eMM;
}

function getAddPrice(time, fees) {
    const [timeDefault, priceDefault, timeAdd, priceAdd] = fees;
    if(time <= timeDefault) return priceDefault;
    time -= timeDefault;
    return priceDefault + (Math.ceil(time / timeAdd) * priceAdd);
}

// 풀이 2.
function solution2(fees, records) {
  const map = new Map(); // 모든 차량 총 주차 시간(분)
  for(let i = 0, len = records.length; i < len; i++) {
    const [timeStr, car, state] = records[i].split(' ');
    const minute = getMinute(timeStr, state);
    if(state === "IN") {
      map.set(car, (map.get(car) || 0) + minute);
    }
    if(state === "OUT") {
      map.set(car, map.get(car) - minute);
    }
  }
  for(let [car, minute] of map) {
    const price = getAddPrice(minute, fees);
    map.set(car, price);
  }
  return [...map].sort(([a_key, a_val], [b_key, b_val]) => a_key - b_key).map(([car, price]) => price);
}

function getMinute(time, state) {
  const [h, m] = time.split(":").map(Number);
  time = (h * 60) + m; // 분 단위로 변환
  return 1439 - time; // 23:59 - 입/출차 시간
}

function getAddPrice(time, fees) {
  const [timeDefault, priceDefault, timeAdd, priceAdd] = fees;
  if(time <= timeDefault) return priceDefault;
  time -= timeDefault;
  return priceDefault + (Math.ceil(time / timeAdd) * priceAdd);
}

// 1번 풀이 해설
// [해시A]를 통해 차량번호를 key, 차량의 '입차 시간'을 value로 가진다.
// [해시B]를 통해 차량번호를 key, 차량의 '주차 시간'을 value로 가진다.

// - loop
// 루프를 통해 [해시A]로 해당 차량의 입차시간을 기록하고,
// records의 해당 차량이 출차시간인 경우 입차시간과의 총 주차 시간을 [해시B] 에 등록한다.
// 요금 정산이 완료된 경우 [해시A]에서 해당 차량을 지운다.
// - if
// [해시A]에 남아있는 입차시간의 차량의 경우 출차 시간을 23:59 로 하여 총 주차 시간을 [해시B] 에 등록한다.
// - loop
// [해시B] 의 주차 시간을 가지고 해당 차량의 총 주차 요금을 [해시B] 에 재등록한다.
// 모든 차량의 요금 기록이 완료되면 [해시B]를 '차량 번호가 작은 순서'대로 요금들을 배열 형태로 반환한다.
