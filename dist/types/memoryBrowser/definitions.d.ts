interface BaseSymbolDefinition {
    name: string;
    length?: number;
    hidden?: boolean;
}
interface SimpleSymbol extends BaseSymbolDefinition {
    type?: "byte" | "word" | "int";
    default?: number;
}
interface StructSymbol extends BaseSymbolDefinition {
    type?: "struct";
    fields?: SymbolDefinition[];
}
type SymbolDefinition = SimpleSymbol | StructSymbol | string;
/**
 * A DIV symbol is an object describing a function, a variable or a proces.
 * The following fields describe the symbol:
 *
 *  * type    - is the type of the cell: "byte" (1 byte), "word" (2 bytes),
 *              "int" (4 bytes; default if omitted) and "struct".
 *  * name    - is the name of the symbol.
 *  * length  - times to repeat this symbol (1 if omitted).
 *  * hidden  - if true, the symbol is not visible in the memory browser.
 *  * fields  - if the type is "struct", this is the list of symbols of the
 *              struct.
 *  * default - default value for the cell (0 if omitted).
 *
 * The `DivSymbol` type requires all the fields to be present, but there is
 * a relaxed version (`ShortSymbol`) of it where only the name is required.
 * Another valid alternative is to specify a string with the "name" of the
 * symbol.
 */
type DivSymbol = Required<SimpleSymbol> | (Required<Omit<StructSymbol, "fields">> & {
    fields: DivSymbol[];
});
interface WellKnownSymbols {
    wellKnownGlobals: Array<DivSymbol>;
    wellKnownLocals: Array<DivSymbol>;
    wellKnownConstants: Array<DivSymbol>;
}
/**
 * Compendium of all the well known DIV symbols, common to all DIV programs.
 * It becomes the corner stone of the `SymbolTable`, from which the memory
 * map is derived.
 *
 * Based on docs, sources, and experimental tests:
 * https://github.com/DIVGAMES/DIV-Games-Studio/blob/0c006cca548f9d6dc66d174d4f05d167148c7e78/dll/div.h
 *
 * Experimental tests are based on measuring offsets between pairs of variables
 * or struct fields. It seems there are "hidden" variables.
 *
 * IMPORTANT NOTE:
 * Present values are chosen to preserve experimental offsets. When multiple
 * values preserve the offsets, I chose the one closest to what is documented.
 */
declare const DIV_SYMBOLS: WellKnownSymbols;
declare function normalize(symbol: SymbolDefinition): DivSymbol;
export { DIV_SYMBOLS, WellKnownSymbols, SymbolDefinition, DivSymbol, normalize, };
