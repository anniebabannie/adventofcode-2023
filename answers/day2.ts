import { getLines } from "..";

export async function day2() {
  const lines = await getLines(2)
  // problemA(lines);
  problemB(lines);
}

type Color = "red" | "green" | "blue"

type Combination = {
  red: number,
  green: number,
  blue: number
}

type Game = Combination[];

function getGames(lines:string[]): Game[] {
  return lines.map((l) => {

    const game:Game = [];
    
    const combos = l.replace(/Game \d+: /g, '').split("; ");
    combos.map((comboTxt) => {
      const colors = comboTxt.split(", ")
      const c:Combination = { red: 0, green: 0, blue: 0}

      colors.map(color => {
        const txt = color.split(" ");

        const amount = parseInt(txt[0]);
        const colorName = txt[1];
        c[colorName as Color] = amount as number;
      })
      game.push(c);
    })
    return game;
  })
}

const potentialBag: Combination = {
  red: 12,
  green: 13,
  blue: 14
}

// PROMPT:
// The Elf would first like to know which games would have been possible 
// if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
async function problemA(lines: string[]) {
  const games = getGames(lines);
  const possibilities:boolean[] = []
  games.forEach((game, i) => {
    // console.log(`Game ${i+1}:`);
    // console.log(game)

    possibilities[i] = true;
    game.forEach(round => {
      if (potentialBag.red < round.red) return possibilities[i] = false;
      if (potentialBag.green < round.green) return possibilities[i] = false;
      if (potentialBag.blue < round.blue) return possibilities[i] = false;
    })
  })

  let sum = 0;
  possibilities.forEach((p, i) => {
    console.log(`Game ${i+1}:`, p);
    if (p) {
      sum += i+1
    }
  })
  
  // answer
  console.log(sum)
}

async function problemB(lines:string[]) {
  const games = getGames(lines);
  let sum = 0;
  games.map((game, i) => {
    let min = { red: 0, green: 0, blue: 0}
    game.map(round => {
      if (min.red < round.red) min.red = round.red;
      if (min.green < round.green) min.green = round.green;
      if (min.blue < round.blue) min.blue = round.blue;
    })
    // console.log(`game ${i+1}:`, min)
    const power = min.red*min.green*min.blue
    sum += power;
    return min;
  })

  // answer
  console.log(sum)
}