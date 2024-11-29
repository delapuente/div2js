PROGRAM graph_example;

PRIVATE
  graph_1;

BEGIN
  graph_1 = load_map("help/help.map");
  graph = graph_1;
  LOOP
    x = mouse.x;
    y = mouse.y;
    FRAME;
  END
END