(module
(import "js" "write" (func $write (param i32)))
(import "js" "read" (func $read (result i32)))
(import "jj" "log" (func $logger (param i32) (param i32)))
(memory $memory (export "memory") 2)

(global $cc (mut i32) (i32.const 0))
(global $pc (mut i32) (i32.const 0))
(global $opcode (mut i32) (i32.const 0))
(global $cellcc (mut i32) (i32.const 0))
(global $valuesp (mut i32) (i32.const 0))

(func $t4 (param $value i32) (result i32)
  (i32.mul
      (local.get $value)
      (i32.const 4)
  )
)

(func $move 

  (global.set $cc
    (i32.add 
      (global.get $cc)
      (call $value))
   )
)



(func $mult 
    
    (local $multiplier i32)
    (local $offset i32)

    (local.set $offset
      (i32.load16_s
          (i32.add
              (i32.const 10000)
              (i32.add
                (i32.mul
                    (global.get $pc)
                    (i32.const 8)
                )
                (i32.const 4)
                )

          )
      )
    )

    (local.set $multiplier
      (i32.load16_s
          (i32.add
              (i32.const 10000)
              (i32.add
                (i32.mul
                    (global.get $pc)
                    (i32.const 8)
                )
                (i32.const 6)
                )

          )
      )
    )




  (i32.store8
      (i32.add
        (global.get $cc)
        (local.get $offset)
      )
    (i32.add
      (i32.mul
        (call $get)   
        (local.get $multiplier)
      )
      (i32.load8_u
          (i32.add
            (global.get $cc)
            (local.get $offset)
          )
      )
    )
  )


  (call $zero)


)


(func $math 
    


  (i32.store8
      (global.get $cc)
    (i32.add
      (call $get)
      (call $value)))
)

(func $zero
  (i32.store8
      (global.get $cc)
    (call $value)
    )
)
(export "zero" (func $zero))

 
(func $leftbracket 
  (if
    (i32.eq
      (call $get)
      (i32.const 0)) ;; Compare to zero
    (then
      (global.set $pc
        (call $value))
    )
  )
)

(func $rightbracket 
  (if
    (i32.ne
      (call $get)
      (i32.const 0))
    (then
      (global.set $pc
        (call $value))
    )
  )
)

(func $get (result i32)


    (i32.load8_u
        (global.get $cc)
    )
)

(func $output (param $value i32)
  (call $write
    (local.get $value)
  )
)

(func $input
    (i32.store8
      (global.get $cc)
    (call $read)
    )

)

(func $log (param $value1 i32) (param $value2 i32)
  (call $logger
    (local.get $value1)
    (local.get $value2)
  )
)

(func $incpc 
    (global.set $pc
    (i32.add
      (global.get $pc)
      (i32.const 1))))

(func $setpc (param $value i32)
    (global.set $pc (local.get $value))
)
(export "setpc" (func $setpc))


(func $clear_memory
  (memory.fill
    (i32.const  0) ;; Starting offset
    (i32.const 0)       ;; Value to set (zero in this case)
    (i32.const  128000) ;; Number of bytes to clear
  )
)
(export "clear_memory" (func $clear_memory))

(func $value (result i32)
    (i32.load
        (i32.add
            (i32.const 10000)
            (i32.add
              (i32.mul
                  (global.get $pc)
                  (i32.const 8)
              )
              (i32.const 4)
              )

        )
    )
)

(func $op (result i32)
    (i32.load
        (i32.add
            (i32.const 10000)
            (i32.mul
                (global.get $pc)
                (i32.const 8)
            )

        )
    )
)
(export "op" (func $op))


(func $run
  (block $end
    (loop $main_loop

 
      ;; Dispatch based on the current opcode
      (block $default
      (block $case_mult
      (block $case_input
      (block $case_output
      (block $case_right_bracket
      (block $case_left_bracket
       (block $case_math
        (block $case_move
            (block $case_zero
                (br_table $case_zero $case_move $case_math $case_left_bracket $case_right_bracket $case_output $case_input $case_mult $default
                    (call $op) ;; Jump to $case_move
                )

            )

        (call $zero)
        (call $incpc)
        (br $main_loop)

        )
        (call $move)
        (call $incpc)
        (br $main_loop)
        
        )
        (call $math)
        (call $incpc)
        (br $main_loop)

        )
        (call $leftbracket)
        (call $incpc)
        (br $main_loop)

        )

        (call $rightbracket)
        (call $incpc)
        (br $main_loop)

        )

        (call $output (call $get))
        (call $incpc)
        (br $main_loop)

        )

        (call $input)
        (call $incpc)
        (br $main_loop)
        )
        ;;case mult

        (call $mult)
        (call $incpc)
        (br $main_loop)
        )
          (br $end) ;; Exit the outer block
      
    )
  )
)
(export "run" (func $run))


)