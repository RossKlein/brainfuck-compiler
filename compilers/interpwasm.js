"use strict";

const wasmBuffer = new Uint8Array([0,97,115,109,1,0,0,0,1,12,3,96,1,127,0,96,0,0,96,0,1,127,2,22,2,2,106,115,5,119,114,105,116,101,0,0,2,106,115,4,114,101,97,100,0,2,3,7,6,1,0,0,1,2,1,5,3,1,0,4,6,16,3,127,1,65,0,11,127,1,65,0,11,127,1,65,0,11,7,60,7,6,109,101,109,111,114,121,2,0,4,122,101,114,111,0,2,5,115,101,116,112,99,0,3,6,115,101,116,101,110,100,0,4,12,99,108,101,97,114,95,109,101,109,111,114,121,0,5,2,111,112,0,6,3,114,117,110,0,7,10,251,2,6,20,0,35,0,35,1,65,3,116,65,148,206,0,106,40,2,0,58,0,0,11,6,0,32,0,36,1,11,6,0,32,0,36,2,11,13,0,65,0,65,0,65,128,232,7,252,11,0,11,15,0,35,1,65,3,116,65,144,206,0,106,40,2,0,11,183,2,1,2,127,3,64,35,1,35,2,76,4,64,2,64,2,64,2,64,2,64,2,64,2,64,2,64,2,64,2,64,35,1,65,3,116,65,144,206,0,106,40,2,0,14,8,0,1,2,3,4,5,6,7,8,11,35,0,35,1,65,3,116,65,148,206,0,106,40,2,0,58,0,0,35,1,65,1,106,36,1,12,9,11,35,0,35,1,65,3,116,65,148,206,0,106,40,2,0,106,36,0,35,1,65,1,106,36,1,12,8,11,35,0,35,0,45,0,0,35,1,65,3,116,65,148,206,0,106,40,2,0,106,58,0,0,35,1,65,1,106,36,1,12,7,11,35,0,45,0,0,69,4,64,35,1,65,3,116,65,148,206,0,106,40,2,0,36,1,11,35,1,65,1,106,36,1,12,6,11,35,0,45,0,0,4,64,35,1,65,3,116,65,148,206,0,106,40,2,0,36,1,11,35,1,65,1,106,36,1,12,5,11,35,0,45,0,0,16,0,35,1,65,1,106,36,1,12,4,11,35,0,16,1,58,0,0,35,1,65,1,106,36,1,12,3,11,35,1,65,3,116,34,0,65,150,206,0,106,46,1,0,33,1,32,0,65,148,206,0,106,46,1,0,34,0,35,0,106,35,0,32,0,106,45,0,0,32,1,35,0,45,0,0,108,106,58,0,0,35,1,65,1,106,36,1,12,2,11,11,11,11]);
const imports = {
  js: {
    write: (value) => {
     process.stdout.write(String.fromCharCode(value));
    },
    read: () => {
      return fs.readSync(
        process.stdin.fd,
        Buffer.alloc(1),
        0,
        1,
        null,
      )[0];
    }
  },
  jj: {
    log: (op, value) => {
      process.stdout.write(`${op} at ${value} `);
    }
  }
};
const { instance } = await WebAssembly.instantiate(wasmBuffer, imports);

// TODO: copy from step-6
const Opv = {  
  CarrotLeft: 60,
  CarrotRight: 62,
  Carrot: 1,
  Math: 2,
  Plus : 43,
  Minus : 45,
  Mult  : 7,
  BracketLeft : 3,
  BracketRight: 4,
  Period: 5 ,
  Comma: 6 ,
  Zero: 0,
  End: 10,
  
  };
  const Ops = {  
    CarrotLeft: {op: 60, value: 1}, 
    CarrotRight: {op: 62, value: 1},
    Plus : {op: 43, value: 1}, 
    Minus : {op: 45, value: 1}, 
    BracketLeft : {op: 91, value:9999}, 
    BracketRight: {op: 93, value:9999}, 
    Period: {op: 46}, 
    Comma: {op: 44}, 
    Zero: {op: 48} 
    
    };

const create_program = (bytes) => {
  // TODO: Copy implementation from step-6
  const prog = new Int32Array(40000);
  let a = 0;
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
        prog[a+1] = -count;
        a+=2;
        break;
      case Ops.CarrotRight.op: //>
        count = 1;
        while(bytes[i+1] === Ops.CarrotRight.op){
          count++;
          i++;
        }
        // prog.push({op: Ops.Carrot.op, value: count});
        prog[a] = Opv.Carrot;
        prog[a+1] = count;
        a+=2;
        break;
      case Ops.Plus.op: //+
        count = 1;
        while(bytes[i+1] === Ops.Plus.op){
          count++;
          i++;
        }
        // prog.push({op: Ops.Math.op, value: count});
        prog[a] = Opv.Math;
        prog[a+1] = count;
        a+=2;
        break;
      case Ops.Minus.op: //-
        count = 1;
        while(bytes[i+1] === Ops.Minus.op){
          count++;
          i++;
        }

        // prog.push({op: Ops.Math.op, value: -count});
        prog[a] = Opv.Math;
        prog[a+1] = -count;
        a+=2;
        break;
      case Ops.BracketLeft.op: // [
        // prog.push({... Ops.BracketLeft});
        prog[a] = Opv.BracketLeft;
        prog[a+1] = 9999; //Ops.BracketLeft.value
        a+=2;
        break;
      case Ops.BracketRight.op: //]
        // prog.push({... Ops.BracketRight});
        prog[a] = Opv.BracketRight;
        prog[a+1] = 9999; //Ops.BracketRight.value
        a+=2;
        break;
      case Ops.Period.op: //.
        prog[a] = Opv.Period;
        prog[a+1] = 0;
        a+=2;
        break;
      case Ops.Comma.op://,
        prog[a] = Ops.Comma;
        prog[a+1] = 0;
        a+=2;
        break;
      default:
        break;
    }
    i += 1;
  }
  prog[a] = Opv.End
  prog[a+1] = 0
  return prog;
};

const optimize_zero = (prog) => {
  // TODO: Copy from step-6
  let i = 0;
  let a = 0;
  let new_prog = new Int32Array(40000);  
  while ( i < prog.length) {

    if (prog[i] === Opv.BracketLeft &&
       prog[i+2] === Opv.Math &&
       prog[i+3] === -1 &&
        prog[i+4] === Opv.BracketRight) {
          new_prog[a] = Opv.Zero;
          new_prog[a+1] = 0
          i += 6;
          a+=2;

    }  else {

      new_prog[a] = prog[i];
      new_prog[a+1] = prog[i+1];
      i+=2;
      a+=2;
    } 
   }
   return new_prog;
};

const optimize_times_equals = (prog) => {
  // TODO: Implement the optimize_times_equals function
  let i = 0;
  let a = 0;
  let new_prog = new Int32Array(40000);  
  while ( i < prog.length) {
  if(prog[i] === Opv.BracketLeft &&
    prog[i+2] === Opv.Carrot &&
    // prog[i+3] > 0 && carrot can actually be any direction

    prog[i+4] === Opv.Math &&
    prog[i+5] > 0 && 

    prog[i+6] === Opv.Carrot &&
    prog[i+7] === -prog[i+3] && //closing carrot needs to be the inverse of open carrot

    prog[i+8] === Opv.Math &&
    prog[i+9] === -1 &&
     prog[i+10] === Opv.BracketRight){

      // prog[i+5] is the multiplier
      // prog[i+3] is the offset

      new_prog[a] = Opv.Mult;
      //  multiplier and offset into 32bit
      new_prog[a+1] = (prog[i+5] << 16) | (prog[i+3] & 0xFFFF);
      new_prog[a + 2] = Opv.Zero;
      new_prog[a + 3] = 0;
      i += 12;
      a += 4;


  }else if(prog[i] === Opv.BracketLeft &&
    prog[i+2] === Opv.Math &&
    prog[i+3] === -1 &&
    prog[i+4] === Opv.Carrot &&
    // prog[i+5] > 0 && carrot can actually be any direction

    prog[i+6] === Opv.Math &&
    prog[i+7] > 0 && 

    prog[i+8] === Opv.Carrot &&
    prog[i+9] === -prog[i+3] && //closing carrot needs to be the inverse of open carrot

     prog[i+10] === Opv.BracketRight){

      // prog[i+7] is the multiplier
      // prog[i+5] is the offset

      new_prog[a] = Opv.Mult;
      //  multiplier and offset into 32bit
      new_prog[a+1] = (prog[i+7] << 16) | (prog[i+5] & 0xFFFF);
      new_prog[a + 2] = Opv.Zero;
      new_prog[a + 3] = 0;
      i += 12;
      a+=4;

    }  else {

    new_prog[a] = prog[i];
    new_prog[a+1] = prog[i+1];
    i+=2;
    a+=2;

  }


  }
  return new_prog;
};
let end = 0
const align_brackets = (prog) => {
  // TODO: Copy implementation from step-6
  const stack = []
  let i = 0;
  while (i < prog.length) {
    switch (prog[i]) {
      case Opv.BracketLeft: //[

        stack.push(i); //op value
        break;
      case Opv.BracketRight: //]
        let open = stack.pop();

        prog[open+1] = i>>1;
        prog[i+1] = open>>1;
        break;
      case Opv.End:
        end = i;
      default:
        break;
    }
    i += 2;
  }
};


const regroup = (prog) => {
  let i = 0;
  let a = 0;
  let new_prog = new Int32Array(40000);  
  let total = 0;
  while( i < prog.length){
    switch (prog[i]) {

      case Opv.Math:
        total = prog[i+1];
        while(prog[i+2] === Opv.Math || prog[i+2] === Opv.Zero){
          total += prog[i+3]
          if(prog[i+2] === Opv.Zero){
            total = 0;
          }
          i+=2;
        }
        new_prog[a] = Opv.Math;
        new_prog[a+1] = total;

        a+=2;
        i+=2;
        break;
      case Opv.Zero:

        total = 0;
        while(prog[i+2] === Opv.Math || prog[i+2] === Opv.Zero){
          total += prog[i+3]
          if(prog[i+2] === Opv.Zero){
            total = 0;
          }
          i+=2;
        }
        new_prog[a] = Opv.Zero;
        new_prog[a+1] = total;
        a+=2;
        i+=2;
        break;
      case Opv.Carrot:
        total = prog[i+1]
        while(prog[i+2] === Opv.Carrot){
          total += prog[i+3]
          i+=2;
        }
        new_prog[a] = Opv.Carrot;
        new_prog[a+1] = total;
        a+=2;
        i+=2;

        break;
      default:
        new_prog[a] = prog[i];
        new_prog[a+1] = prog[i+1];
        a+=2;
        i+=2;
        break;


    }



  }

  return new_prog;
}

const bf_eval = (prog, instance) => {
  // TODO: Copy implementation from step-6
  // But - add a case for the Multiply Op
  // const memory = new WebAssembly.Memory({ initial: 1 }); // Adjust size as needed
  
  const memory = instance.exports.memory;
  const memoryView32 = new Uint32Array(memory.buffer, 10000);
  memoryView32.set(prog); 
  let progstop = end ? end : prog.length;
  instance.exports.setend(progstop);
  // const end = new Uint32Array(memory.buffer, 90000);
  // end.set([9])//set an opcode for default case which ends program


  // Create a Uint16Array view for `progop`
  // const memoryView16 = new Uint32Array(memory.buffer, 80000); // View starting at 40000
  // memoryView16.set(progop); // Write `progop` (uint16 values)
  // console.log(prog)
  // console.log(progop)
  // console.log("Data in memory:", new Uint32Array(memory.buffer, 40000, n.length));
  instance.exports.run();

};

export const run = async (bytes) => {
  instance.exports.clear_memory();
  instance.exports.zero();
  instance.exports.setpc(0);

  let prog = create_program(bytes);
  prog = optimize_zero(prog);
  prog = optimize_times_equals(prog);
  prog = regroup(prog);
  align_brackets(prog);
  bf_eval(prog, instance);
};

