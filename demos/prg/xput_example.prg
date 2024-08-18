PROGRAM xput_example;

PRIVATE
  file1;
  x_coord;
  y_coord;
  angle1;
  size1;
  flags1;

BEGIN
  file1 = load_fpg("help/help.fpg");
  LOOP
    x_coord = 160;//rand(0, 319);
    y_coord = 100;//rand(0, 199);
    angle1 = 0;//rand(-pi, pi);
    size1 = 100;//rand(10, 200);
    flags1 = 0;//rand(0, 7);

    // Put graphic 101
    xput(file1, 100, x_coord, y_coord, angle1, size1, flags1, 0);

    FRAME;
  END
END