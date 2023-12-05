import { getLines } from "..";

// There are lots of numbers and symbols you don't really understand, 
// but apparently any number adjacent to a symbol, even diagonally, 
// is a "part number" and should be included in your sum. 
// (Periods (.) do not count as a symbol.)

// In this schematic, two numbers are not part numbers because 
// they are not adjacent to a symbol: 114 (top right) and 58 (middle right). 
// Every other number is adjacent to a symbol and so is a part number; 
// their sum is 4361.

// Of course, the actual engine schematic is much larger. 
// What is the sum of all of the part numbers in the engine schematic?


export async function day3() {
  const lines = await getLines(3)
  problemA(lines);
}

function getAdjacentElements(array: any[], x:number, y:number) {
  const numColumns = 140;
  const adjacents = {
    topLeft : (y - 1 < 0 || x - 1 < 0) ? ''                 : array[ y - 1 ][ x - 1 ],
    top     : (x - 1 < 0) ? ''                              : array[ y ][ x - 1 ],
    topRight: (y + 1 >= array.length || x - 1 < 0) ? ''     : array[ y + 1 ][ x - 1 ],
    Left    : (y - 1 < 0) ? ''                              : array[ y - 1 ][ x ],
    Right   : (y + 1 >= array.length) ? ''                  : array[ y + 1 ][ x ],
    botLeft : (y - 1 < 0 || x + 1 > numColumns) ? ''        : array[ y - 1 ][ x + 1 ],
    bot     : (x + 1 > numColumns) ? ''                     : array[ y ][ x + 1 ],
    botRight: (y + 1 >= array.length || 
               x + 1 > numColumns) ? ''                     : array[ y + 1 ][ x + 1 ],
  }

  return Object.values(adjacents);
}

async function problemA(lines:string[]) {
  const matrix = lines.map((line,i) => {
    const columns = line.split('');
    return columns;
  })
  const validNumbers: string[] = [];
  matrix.forEach((row, y) => {
    console.log(`Row ${y}:`)

    let number = '';
    let numberIsAdjacent = false;

    row.forEach((col, x) => {
      console.log(`    Col ${x}:`, col)
      const isNum = col.match(/\d/g);
      if (isNum) {
        number += col;

        const adjacents = getAdjacentElements(matrix, x, y);
        console.log("         ", adjacents)
        adjacents.forEach((a:string) => {
          if (!a) return;
          const validMatches = Array.from(a.matchAll(/[^.\d]+/g), (match) => match[0])
          if (validMatches.length) numberIsAdjacent = true;
        })

        if (x + 1 === row.length) {
          if (number && numberIsAdjacent) validNumbers.push(number)
        }
      } else {
        // PROBLEM: if number is the last in the row, it doesn't get added
        if (number && numberIsAdjacent) validNumbers.push(number)
        number = '';
        numberIsAdjacent = false;
      }
    })
  })

  console.log(validNumbers);

  let sum = 0;

  validNumbers.forEach(n => {
    const num = parseInt(n);
    if (!num) return;
    sum += num;
  })

  // answer
  console.log(sum)
}
