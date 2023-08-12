PROGRAM put_pixel_example;

PRIVATE
  x_point;
  y_point;
  color;

BEGIN
  LOOP
    x_point = rand(0, 319);
    y_point = rand(0, 199);
    color = rand(0, 255);

    // Draw dots on the background randomly
    put_pixel(x_point, y_point, color);

    FRAME;
  END
END