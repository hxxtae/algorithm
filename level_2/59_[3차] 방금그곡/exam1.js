// 풀이 1.
function solution1(m, musicinfos) {
  const map = new Map();
  let count = 1;
  m = musicSubstitution(m);
  
  for(let musicinfo of musicinfos) {
    let time = musicinfo.slice(0, 11);
    let [name, music] = musicinfo.slice(12).split(',');
      
    time = transTimetoMinite(time);
    music = musicSubstitution(music);
      
    music = (time >= music.length ? music.padEnd(time, music) : music.slice(0, time));
    const confirmMusic = music.includes(m);
      
    if(!confirmMusic) continue;
    map.set(name, {count, time});
    count++;
  }
  if(map.size === 0) return '(None)';
  const sortMap = [...map].sort(([a_name, a_obj], [b_name, b_obj]) => {
    if(b_obj.time - a_obj.time === 0) {
      return a_obj.count - b_obj.count;
    }
    return b_obj.time - a_obj.time;
  })[0];
  return sortMap[0];
}

// 악보 치환 함수(before)
function musicSubstitution(musicStr) {
  const musicSubMap = new Map([['C#', 'c'], ['D#', 'd'], ['F#', 'f'], ['G#', 'g'], ['A#', 'a']]);
  for(let [key, m] of musicSubMap) {
    const reg = new RegExp(`${key}`, 'g');
    musicStr = musicStr.replace(reg, m);
  }
  return musicStr;
}

// 악보 치환 함수(after - Refactoring)
function musicSubstitution(musicStr) {
  return musicStr.replace(/[A-Z]#/g, c => c[0].toLowerCase());
}

// 시간 분단위 변환 함수
function transTimetoMinite(time) {
  let [start, end] = time.split(',');
  const [sH, sM] = start.split(':');
  const [eH, eM] = end.split(':');
  start = (sH * 60) + +sM;
  end = (eH * 60) + +eM;
  return end - start;
}

// NOTE: 해시를 활용한 방법

// [접근]
// 1. musicinfos를 반복하면서 재생시간 안에서 재생된 악보를 나열하고,
//    나열된 악보 안에서 네오가 들은 m이 있는지 확인

// - if 나열된 악보에 m이 전부 있다면
//   -> map에 곡명, 순서, 재생시간을 기록한다.

// - else
//   -> 다음 musicinfo를 반복

// ------------

// map
//  "곡이름": [순서, 총 재생시간(분)]
//  "곡이름": [순서, 총 재생시간(분)]
//  ...

// 풀이 2.
function solution2(m, musicinfos) {
  m = musicSubstitution(m);
  
  musicinfos = musicinfos.map((musicinfo, idx) => {
    let [start, end, name, music] = musicinfo.split(',');
    const minute = transTimetoMinite(start, end);
    music = musicSubstitution(music);
    music = minute >= music.length ? music.padEnd(minute, music) : music.slice(0, minute);
    const confirmMusic = music.includes(m);
    return (confirmMusic ? [name, minute, idx] : ['(None)', 0, idx]);
  }).sort((a, b) => {
    if(a[1] - b[1] === 0) return a[2] - b[2];
    return b[1] - a[1];
  })[0];
  
  return musicinfos[0];
}

// 악보 치환 함수
function musicSubstitution(musicStr) {
  return musicStr.replace(/[A-Z]#/g, c => c[0].toLowerCase());
}

// 시간 분단위 변환 함수
function transTimetoMinite(start, end) {
  const [sH, sM] = start.split(':');
  const [eH, eM] = end.split(':');
  start = (sH * 60) + +sM;
  end = (eH * 60) + +eM;
  return end - start;
}

// NOTE: 배열을 활용한 방법