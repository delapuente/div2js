PROGRAM _passing_parameters;
GLOBAL
  global_variable;
LOCAL
  local_variable;
BEGIN
  test(1,2,3,4);
END

PROCESS test(global_variable, local_variable, private_variable, parameter)
PRIVATE
  private_variable;
BEGIN
  DEBUG;
END
