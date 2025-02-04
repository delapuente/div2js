PROGRAM _collision;
GLOBAL
  empty_square_id;
  colliding_process_id;
BEGIN
  load_fpg("TEST.FPG");
  empty_square_id = empty_square(); // 1. Add empty_square process and yields to it.
  green_square();                   // 3. Add green_square process and yields to empty_square.
END                                 // 6. Remove main program and yields to empty_square.

PROCESS green_square();
BEGIN
  graph = 7;
  x = 160;
  y = 80;
  FRAME;                            // 5. Yields to main program.
  colliding_process_id = collision(TYPE empty_square); // 8. Yields and check collision.
END                                 // 10. Remove green_square and finish.

PROCESS empty_square();
BEGIN
  graph = 6;
  x = 160;
  y = 100;
  FRAME;                            // 2. Yields to main program.
  FRAME;                            // 4. Yields to green_square.
  FRAME;                            // 7. Yields to green_square.
END                                 // 9. Remove empty_square and yields to green_square.
