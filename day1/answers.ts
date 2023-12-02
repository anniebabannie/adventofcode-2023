const lastDigit = (num:number) => num % 10;


export async function getLines(): Promise<string[]> {
  const calibrationValues = "./day1/data/calibration-values.txt";
  const file = Bun.file(calibrationValues);
  const text = await file.text();
  const lines = text.split(`\n`).slice(0,-1); // remove the trailing line break
  return lines;
}

export async function problemA(lines: string[]) {
  let sum = 0;
  lines.forEach(l => {
    const numString = l.replace(/\D/g, '');
    const first = numString.slice(0, 1);
    const last = numString.slice(-1);
    const int = parseInt(first+last);
    sum += int;
  })

  // answer
  console.log("Day 1, part 1", sum)
}

enum SpelledNums {
  "one" = "1",
  "two" = "2",
  "three" = "3",
  "four" = "4",
  "five" = "5",
  "six" = "6",
  "seven" = "7",
  "eight" = "8",
  "nine" = "9"
}

export async function problemB(lines: string[]) {
  
  let sum = 0;
  
  lines.forEach((l) => {
    const reggie = /(?<=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
    const validNumMatches = Array.from(l.matchAll(reggie), (match) => match[1])

    if (!validNumMatches) return;
    const numsOnly = validNumMatches.map((v:string) => {
      let num = v;
      if (Object.keys(SpelledNums).includes(v)) {
        num = v.replace(/(one|two|three|four|five|six|seven|eight|nine)/g, (SpelledNums as any)[v])
      }
      return num;
    })
    const first = numsOnly[0];
    const last = numsOnly[numsOnly.length - 1];
  
    sum += parseInt(first+last)

  })

  // answer
  console.log("Day 1, part 2", sum)
}