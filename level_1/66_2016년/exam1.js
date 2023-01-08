function solution(a, b) {
  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayIdx = new Date(`2016/${a}/${b}`).getDay();
  return day[dayIdx];
}
