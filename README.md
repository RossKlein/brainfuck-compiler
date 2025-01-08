
# Brainf*ck JIT Compiler

## Project Overview
This project was developed as the final assignment for the **Theory & Design of Programming Languages** course in Fall 2024. The goal was to write a compiler for the toy programming language **Brainf*ck** using JavaScript. The project evolved through the following phases:
1. **Interpreter**: An initial implementation of a Brainf*ck interpreter in JavaScript.
2. **Optimization with WebAssembly**: Experimented with WebAssembly (WASM) to optimize execution speed.
3. **JIT Compiler**: Ultimately implemented a Just-In-Time (JIT) compiler, which proved to be the fastest approach.

My implementation achieved **2nd place on the class leaderboard** in terms of performance.

---

## How to Run

### Requirements
- **Node.js**

### Running the Project
There are two main files to run:
1. **`test.js`**: Runs the Brainf*ck JIT implementation in JavaScript.
2. **`testwasm.js`**: Runs the WebAssembly-enhanced version.

To execute, run:
```bash
node test.js
```
or
```bash
node testwasm.js
```

### Testing Other Brainf*ck Files
- Additional `.bf` files are included in the repository for testing.
- To test these, modify the input file paths in `test.js` or `testwasm.js`.

---

## WebAssembly Implementation Details
- While you can view the WASM files in the repository, note that the WebAssembly bytecode is **embedded directly into the interpreter** for execution. This improved runtime performance.

---
