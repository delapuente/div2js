PROGRAM _passing_repeated_parameters;
GLOBAL
  g;
LOCAL
  l;
BEGIN
  test(1,2,3,4,5,6,7,8);
END

PROCESS test(g, g, l, l, p, p, param, param)
PRIVATE
  p;
BEGIN
  DEBUG;
END
