PROGRAM _xput;
BEGIN
  load_fpg("TEST.FPG");
  xput(0, 3, 160, 100, 0, 100, 4, 0);
END