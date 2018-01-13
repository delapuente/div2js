PROGRAM locals;
BEGIN
  a();
  b();
  c();
END

PROCESS a();
BEGIN
  x = 1;
END

PROCESS b();
BEGIN
  x = 2;
END

PROCESS c();
BEGIN
  x = 3;
END
