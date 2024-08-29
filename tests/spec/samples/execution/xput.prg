PROGRAM _xput;
BEGIN
  load_fpg("TEST.FPG");
  xput(0, 1, 2, 2, 0, 100, 0, 0);
  xput(0, 1, 4, 8, 0, 200, 0, 0);
END