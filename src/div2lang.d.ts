declare module 'fs';

declare class Parser {
  yy: any;

  parse: (input: string) => any;

  parseError: (stri: string, hash: string) => any;
}

declare const parser: Parser;

export default parser;
