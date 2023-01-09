// 풀이 1.
function solution1(today, terms, privacies) {
  const map = new Map(terms.map((term) => term.split(' ')));
    return privacies.reduce((result, privace, idx) => {
      const [thisDate, thisTerm] = privace.split(' ');
      const term = map.get(thisTerm);
      return termSolution(today, thisDate, +term) ? [...result, idx + 1] : result;
  }, []);
}

function termSolution(today, compareDate, monthTerm) {
  const termDate = new Date(compareDate);
  termDate.setMonth(termDate.getMonth() + monthTerm);
  const year = termDate.getFullYear(),
        month = termDate.getMonth() + 1,
        date = termDate.getDate();
  return confirmSolution(today, year, month, date);
};

function confirmSolution(today, year, month, date) {
  const TODAY = new Date(today),
        todayYear = TODAY.getFullYear(),
        todayMonth = TODAY.getMonth() + 1,
        todayDate = TODAY.getDate();
  if(year > todayYear) return false;
  else if(year < todayYear) return true;
    
  if(month > todayMonth) return false;
  else if(month < todayMonth) return true;
        
  if(date > todayDate) return false;
  else if(date <= todayDate) return true;
  return;
}

// 풀이 2.
function solution2(today, terms, privacies) {
  const map = new Map(terms.map((term) => term.split(' ')));
  const todayDate = new Date(today);
  return privacies.reduce((result, privace, idx) => {
    const [thisDate, thisTerm] = privace.split(' ');
    const term = map.get(thisTerm);
    return termSolution(todayDate, thisDate, +term) ? [...result, idx + 1] : result;
  }, []);
}

function termSolution(todayDate, thisDate, monthTerm) {
  const termDate = new Date(thisDate);
  termDate.setMonth(termDate.getMonth() + monthTerm);
  return compareSolution(todayDate, termDate);
};

function compareSolution(today, compare) {
  if(compare <= today) return true;
  return false;
}