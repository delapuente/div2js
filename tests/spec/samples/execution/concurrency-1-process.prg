PROGRAM test;
BEGIN
  text_z = 1;
  DEBUG;
  a();
  DEBUG;
  text_z = 3;
  DEBUG;
END

PROCESS a();
BEGIN
  text_z = 2;
END
