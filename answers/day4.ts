import { getLines } from "..";

export async function day4() {
  const lines = await getLines(4, true)
  problemA(lines);
}

function setupCards(lines:string[]) {
  return lines.map((l, cardNum) => {
    const columns = l.replace(/Card\s+\d+: /g, '').split(' | ');
    // console.log(`Card ${cardNum + 1}:`)
    // console.log(columns)
    const halfs = columns.map((half, i) => {
      // if (i === 0) console.log("WINNING: ")
      // if (i === 1) console.log("HAVE: ")
      let numStrs = half.split(" ").filter(n => n !== "");
      // console.log(numStrs)
      const ints = numStrs.map(num => {
        return parseInt(num);
      })
      // console.log(ints)
      return ints;
    })
    return halfs;
  })
}

async function problemA(lines: string[]) {
  const cards = setupCards(lines);
  // console.log(cards)
  let sum = 0;

  // find the winning HAVE numbers + their index
  cards.forEach((card, cardNo) => {
    // console.log(`CARD ${cardNo + 1}:`)
    const wins = card[0];
    const haves = card[1];
    let points = 0;
    let matches = 0;
    
    wins.forEach((w) => {
      if (haves.includes(w)) {
        if (points === 0) {
          points += 1;
          matches += 1;
        } else {
          matches++;
          points = points*2;
        }
      }
    })
    // console.log(matches, points)
    sum += points;
    // console.log(`POINTS: ${points}`)
  })

  // answer
  console.log(sum)
}