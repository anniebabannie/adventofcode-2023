import { getLines, problemA, problemB } from "./day1/answers";

async function day1() {
  const lines = await getLines();
  problemA(lines);
  problemB(lines);
}

day1();