"use strict";
import fs from "fs";

// TODO: change the "step-{n}" to validate each of your impelmentations
import {run} from "./compilers/interpwasm.js";

const hello = fs.readFileSync("bf/hello.bf");
const bench = fs.readFileSync("bf/bench.bf");
const mandelbrot = fs.readFileSync("bf/mandelbrot.bf");
const hanoi = fs.readFileSync("bf/hanoi.bf");
const f = fs.readFileSync("bf/factorial.bf");
run(hello);
const startTime = performance.now()
run(bench);
const endTime = performance.now()
console.log(`Bench took ${endTime - startTime} milliseconds`)
// run(mandelbrot)
// const wasmBuffer = fs.readFileSync('./step-7/lo.wasm');
// console.log(`const wasmBuffer = new Uint8Array(${JSON.stringify([...wasmBuffer])});`);

// run(mandelbrot)
// run(bench);

//3799.5422 milliseconds
//3038.4118999999996 milliseconds
//2479.5726999999997 milliseconds
// with opcodes: 3139.8835 milliseconds
//with rolled up opcodes: 3442.4955 milliseconds
//optimized rolled up opcodes: 3187.0751 milliseconds step 4
//with repeated sequences: 3603.7633 milliseconds
// DAMN: 598.9107 milliseconds
// with WASM: 399.221 milliseconds
