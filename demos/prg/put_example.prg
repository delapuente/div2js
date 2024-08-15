PROGRAM put_example;

PRIVATE
  file1;
  x_coord;
  y_coord;

BEGIN
  file1 = load_fpg("help/help.fpg");
  LOOP
    x_coord = rand(0, 319);
    y_coord = rand(0, 199);

    put(file1, 100, x_coord, y_coord);

    FRAME;
  END
END