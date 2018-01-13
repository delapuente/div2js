PROGRAM put_screen_example;

PRIVATE
  file1;

BEGIN
  file1 = load_fpg("../fpg/help.fpg");

  put_screen(file1, 1); // Put graphic 1 as background.

  LOOP
    FRAME;
  END
END