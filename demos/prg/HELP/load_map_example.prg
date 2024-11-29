PROGRAM load_map_example;

PRIVATE
  map1;

BEGIN
  map1 = load_map("help/help.map");
  put_screen(0, map1);
  LOOP
    FRAME;
  END
END