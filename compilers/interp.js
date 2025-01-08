"use strict";

// TODO: copy from step-6
const Opv = {  
  CarrotLeft: 60,
  CarrotRight: 62,
  Carrot: 1,
  Math: 0,
  Plus : 43,
  Minus : 45,
  BracketLeft : 2,
  BracketRight: 3,
  Period: 4 ,
  Comma: 6 ,
  Zero: 5,
  Mult: 7,
  End: 8
  };
const Ops = {  
  CarrotLeft: {op: 60, value: 1}, 
  CarrotRight: {op: 62, value: 1},
  Carrot: {op: 33, value: 1},
  Math: {op: 35, value: 1},
  Plus : {op: 43, value: 1}, 
  Minus : {op: 45, value: 1}, 
  BracketLeft : {op: 91, value:9999}, 
  BracketRight: {op: 93, value:9999}, 
  Period: {op: 46}, 
  Comma: {op: 44}, 
  Zero: {op: 48},
  End: {op: 8}
  
  };

const create_program = (bytes) => {
  // TODO: Copy implementation from step-6
  const prog = new Uint8Array(30000);
  let a = 0;
  const progop = new Int32Array(30000);
  let i = 0;
  while (i < bytes.length) {
    let count = 1;
    switch (bytes[i]) {
      case Ops.CarrotLeft.op: //<
        count = 1;
        while(bytes[i+1] === Ops.CarrotLeft.op){
          count++;
          i++;
        }
        // prog.push({op: Ops.Carrot.op, value: -count});
        prog[a] = Opv.Carrot;
        progop[a] = -count;
        a++
        break;
      case Ops.CarrotRight.op: //>
        count = 1;
        while(bytes[i+1] === Ops.CarrotRight.op){
          count++;
          i++;
        }
        // prog.push({op: Ops.Carrot.op, value: count});
        prog[a] = Opv.Carrot;
        progop[a] = count;
        a++;
        break;
      case Ops.Plus.op: //+
        count = 1;
        while(bytes[i+1] === Ops.Plus.op){
          count++;
          i++;
        }
        // prog.push({op: Ops.Math.op, value: count});
        prog[a] = Opv.Math;
        progop[a] = count;
        a++;
        break;
      case Ops.Minus.op: //-
        count = 1;
        while(bytes[i+1] === Ops.Minus.op){
          count++;
          i++;
        }

        // prog.push({op: Ops.Math.op, value: -count});
        prog[a] = Opv.Math;
        progop[a] = -count;
        a++;
        break;
      case Ops.BracketLeft.op: // [
        // prog.push({... Ops.BracketLeft});
        prog[a] = Opv.BracketLeft;
        progop[a] = 9999; //Ops.BracketLeft.value
        a++;
        break;
      case Ops.BracketRight.op: //]
        // prog.push({... Ops.BracketRight});
        prog[a] = Opv.BracketRight;
        progop[a] = 9999; //Ops.BracketRight.value
        a++;
        break;
      case Ops.Period.op: //.
        prog[a] = Opv.Period;
        progop[a] = 0;
        a++
        break;
      case Ops.Comma.op://,
        prog[a] = Opv.Comma;
        progop[a] = 0;
        a++;
        break;
      default:
        break;
    }
    i += 1;
  }
  prog[a] = Opv.End
  progop[a] = 0
  return [prog, progop];
};

const optimize_zero = (prog, progop) => {
  // TODO: Copy from step-6
  let i = 0;
  let a = 0;
  let new_prog = new Uint8Array(30000);  
  let new_progop = new Int32Array(30000);
  while ( i < prog.length) {

    if (prog[i] === Opv.BracketLeft &&
       prog[i+1] === Opv.Math &&
       progop[i+1] === -1 &&
        prog[i+2] === Opv.BracketRight) {
          new_prog[a] = Opv.Zero;
          new_progop[a] = 0
          i += 3;
          a++;


    } 
    
    if(prog[i] === Opv.BracketLeft &&
      prog[i+1] === Opv.Carrot &&
      // prog[i+3] > 0 && carrot can actually be any direction
  
      prog[i+2] === Opv.Math &&
      progop[i+2] > 0 && 
  
      prog[i+3] === Opv.Carrot &&
      progop[i+3] === -progop[i+1] && //closing carrot needs to be the inverse of open carrot
  
      prog[i+4] === Opv.Math &&
      progop[i+4] === -1 &&
       prog[i+5] === Opv.BracketRight){
  
        // prog[i+5] is the multiplier
        // prog[i+3] is the offset
  
        new_prog[a] = Opv.Mult;
        //  multiplier and offset into 32bit
        new_progop[a] = (progop[i+2] << 16) | (progop[i+1] & 0xFFFF);
        new_prog[a + 1] = Opv.Zero;
        new_progop[a + 1] = 0;
  
        i += 6;
        a += 2;
  
  
    }else if(prog[i] === Opv.BracketLeft &&
      prog[i+1] === Opv.Math &&
      progop[i+1] === -1 &&
      prog[i+2] === Opv.Carrot &&
      // prog[i+5] > 0 && carrot can actually be any direction
  
      prog[i+3] === Opv.Math &&
      progop[i+3] > 0 && 
  
      prog[i+4] === Opv.Carrot &&
      progop[i+4] === -progop[i+2] && //closing carrot needs to be the inverse of open carrot
  
       prog[i+5] === Opv.BracketRight){
  
        // prog[i+7] is the multiplier
        // prog[i+5] is the offset
  
        new_prog[a] = Opv.Mult;
        //  multiplier and offset into 32bit
        new_progop[a] = (progop[i+3] << 16) | (progop[i+2] & 0xFFFF);
        new_prog[a + 1] = Opv.Zero;
        new_progop[a + 1] = 0;
        i += 6;
        a+=2;
  
      }else {

      new_prog[a] = prog[i];
      new_progop[a] = progop[i];
      i++;
      a++;

    } 
   }
   return [new_prog, new_progop];
};

const optimize_times_equals = (prog, progop) => {
//// combined into optimize_zero for speed
  return [prog, progop];
};
let end = 0;
const align_brackets = (prog, progop) => {
  // TODO: Copy implementation from step-6
  const stack = []
  let i = 0;
  while (i < prog.length) {
    switch (prog[i]) {
      case Opv.BracketLeft: //[
        stack.push(i);
        break;
      case Opv.BracketRight: //]
        let open = stack.pop();
        progop[open] = i;
        progop[i] = open;
        break;
      case Opv.End:
        end = i;
      default:
        break;
    }
    i += 1;
  }
};
const regroup = (prog, progop) => {
  let i = 0;
  let a = 0;
  let new_prog = new Uint8Array(30000);  
  let new_progop = new Int32Array(30000);
  let total = 0;
  while( i < prog.length){
    switch (prog[i]) {

      case Opv.Math:
        total = progop[i];
        while(prog[i+1] == Opv.Math || prog[i+1] == Opv.Zero){
          total += progop[i+1]
          if(prog[i+1] == Opv.Zero){
            total = 0;
          }
          i++;
        }
        new_prog[a] = Opv.Math;
        new_progop[a] = total;
        a++;
        i++;
        break;
      case Opv.Zero:

        total = 0;
        while(prog[i+1] == Opv.Math || prog[i+1] == Opv.Zero){
          total += progop[i+1]
          if(prog[i+1] == Opv.Zero){
            total = 0;
          }
          i++;
        }
        new_prog[a] = Opv.Zero;
        new_progop[a] = total;
        a++;
        i++;
        break;
      case Opv.Carrot:
        total = progop[i]
        while(prog[i+1] == Opv.Carrot){
          total += progop[i+1]
          i++;
        }
        new_prog[a] = Opv.Carrot;
        new_progop[a] = total;
        a++;
        i++;

        break;
      default:
        new_prog[a] = prog[i];
        new_progop[a] = progop[i];
        a++;
        i++;
        break;


    }



  }


  return [new_prog, new_progop];
}

const bf_eval = (prog, progop) => {
  // TODO: Copy implementation from step-6
  // But - add a case for the Multiply Op
  let bracket_net = 0;
  let code = `
    const cells = new Uint8Array(10000);
    let cc = 0;
    `;
    // let outputBuffer = "";

  let pc = 0;
  let progstop = end ? end : prog.length;
  while (pc < progstop) {

    const op = prog[pc];
    const value = progop[pc];
    switch (op) {
      case 0: // '+' or '-'

        code += `cells[cc] += ${value};`;
        break;
      case 1: // '<' or '>'
      // console.log("1")

        code += `cc += ${value};`;
        break;
      case 2: // '['
      // console.log("2")

        code += `while (cells[cc] !== 0) {`;
        break;
      case 3: // ']'
      // console.log("3")

        code += `}`;
        break;
      case 4: // '.'
      // console.log("4")

        // code += `outputBuffer += String.fromCharCode(cells[cc]);`
        code += `process.stdout.write(String.fromCharCode(cells[cc]));`;
        break;
      case 5: // Reset current cell to 0
        code += `cells[cc] = ${value};`;
        break;
      case 6: // ','
      // console.log("6")

        code += `
          cells[cc] = fs.readSync(
            process.stdin.fd,
            Buffer.alloc(1),
            0,
            1,
            null
          )[0];
        `;
        break;
      case 7:
      // console.log("7")

        let multiplier = ((value >> 16) & 0xFFFF) << 16 >> 16;
        let offset = (value & 0xFFFF) << 16 >> 16;
        code += `cells[cc+${offset}] += cells[cc]*${multiplier};`;

        break;
      default:
        break;
    }

    pc++;
  }
  const compiledCode = new Function(code);
  compiledCode();

};

export const run = (bytes) => {
  let [prog, progop] = create_program(bytes);
  [prog, progop] = optimize_zero(prog, progop);
  // [prog, progop] = optimize_times_equals(prog, progop);
  [prog, progop] = regroup(prog, progop);
  align_brackets(prog, progop);
  bf_eval(prog, progop);
};


