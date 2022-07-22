// from https://stackoverflow.com/a/57129703
// added "kith" to uncountable words (and "y'all" as plural you)
export default function plural(word: string): string {
  const plural: { [key: string]: string } = {
    "(quiz)$": "$1zes",
    "^(ox)$": "$1en",
    "([m|l])ouse$": "$1ice",
    "(matr|vert|ind)ix|ex$": "$1ices",
    "(x|ch|ss|sh)$": "$1es",
    "([^aeiouy]|qu)y$": "$1ies",
    "(hive)$": "$1s",
    "(?:([^f])fe|([lr])f)$": "$1$2ves",
    "(shea|lea|loa|thie)f$": "$1ves",
    sis$: "ses",
    "([ti])um$": "$1a",
    "(tomat|potat|ech|her|vet)o$": "$1oes",
    "(bu)s$": "$1ses",
    "(alias)$": "$1es",
    "(octop)us$": "$1i",
    "(ax|test)is$": "$1es",
    "(us)$": "$1es",
    "([^s]+)$": "$1s",
  };

  const irregular: { [key: string]: string } = {
    move: "moves",
    foot: "feet",
    goose: "geese",
    sex: "sexes",
    child: "children",
    man: "men",
    tooth: "teeth",
    person: "people",
    you: "y'all",
  };

  const uncountable: string[] = [
    "aircraft",
    "bison",
    "cod",
    "deer",
    "equipment",
    "fish",
    "hovercraft",
    "information",
    "kith",
    "money",
    "moose",
    "offspring",
    "pike",
    "rice",
    "salmon",
    "series",
    "sheep",
    "shrimp",
    "spacecraft",
    "species",
    "sugar",
    "swine",
    "trout",
    "tuna",
    "wood",
  ];

  // save some time in the case that singular and plural are the same
  if (uncountable.indexOf(word.toLowerCase()) >= 0) {
    return word;
  }

  // check for irregular forms
  for (const w in irregular) {
    const pattern = new RegExp(`${w}$`, "i");
    const replace = irregular[w];
    if (pattern.test(word)) {
      return word.replace(pattern, replace);
    }
  }

  // check for matches using regular expressions
  for (const reg in plural) {
    const pattern = new RegExp(reg, "i");
    if (pattern.test(word)) {
      return word.replace(pattern, plural[reg]);
    }
  }

  return word;
}
