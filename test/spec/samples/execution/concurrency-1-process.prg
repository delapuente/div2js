PROGRAM test;
BEGIN
  argc = 1;
  DEBUG;
  a();
  DEBUG;
  argc = 3;
  DEBUG;
END

PROCESS a;
BEGIN
  argc = 2;
END
