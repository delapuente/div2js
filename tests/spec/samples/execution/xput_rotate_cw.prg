PROGRAM _xput;
BEGIN
  load_fpg("TEST.FPG");
  xput(0, 1, 160, 100, -10000, 300, 0, 0);
END