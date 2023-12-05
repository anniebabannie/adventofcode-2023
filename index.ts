import { day1 } from "./answers/day1";
import { day2 } from "./answers/day2";
import { day3 } from "./answers/day3";

export async function getLines(day:number, sample?: boolean): Promise<string[]> {
  const input = `./inputs/day${day}${sample ? "-sample" : ""}.txt`;
  const file = Bun.file(input);
  const text = await file.text();
  const lines = text.split(`\n`);
  return lines;
}

async function run() {
  // await day1(); 
  // await day2();
  await day3();
}

run();