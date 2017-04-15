PROGRAM locals;
BEGIN
  a();
END

PROCESS a();
BEGIN
  b();
  x = 1;
END

PROCESS b();
BEGIN
  c();
  x = 2;
END

PROCESS c();
BEGIN
  x = 3;
END
