PROGRAM _collision;
GLOBAL
  full_square_id;
  colliding_process_id;
BEGIN
  load_fpg("TEST.FPG");
  green_square();                 // 1. Add green_square process and yields to it.
END                               // 3. Remove main program and yields to green_square.

PROCESS green_square();
BEGIN
  graph = 7;
  x = 160;
  y = 100;
  FRAME;                          // 2. Yields to main program.
  colliding_process_id = collision(TYPE green_square); // 3. Yields to itself and check collision.
END                               // 4. Remove green_square and finish.