function straight_block(mem, exec, args) {
  while (true) {
    switch (exec.pc) {
      case 0:
        dbg(1);
        dbg(2);
        return { state: 'end' };
    }
  }
}
