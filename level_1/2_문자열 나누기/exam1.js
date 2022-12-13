"use strict";

function solution(s) {
  const map = new Map();
  let comfare = s[0];
  let count = 0;
  
  map.set('this', 0);
  map.set('other', 0);
  
  for(let i = 0; i < s.length; i++) {
      comfare === s[i] ? 
          map.set('this', (map.get('this') || 0) + 1) : 
          map.set('other', (map.get('other') || 0) + 1);
      if(map.get('this') === map.get('other')) {
          count = ++count;
          map.set('this', 0);
          map.set('other', 0);
          comfare = s[i + 1];
      }
  }  
  return map.get('this') ? count + 1 : count;
}

// NOTE: 해시 사용