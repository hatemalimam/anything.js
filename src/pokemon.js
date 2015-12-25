/**
 * Pokémon-related utilities.
 */

var matchups = {
    // attacking -> defending types
    normal:   { normal: 1, fighting: 1, flying: 1, poison: 1, ground: 1, rock:.5, bug: 1, ghost: 0, steel:.5, fire: 1, water: 1, grass: 1, electric: 1, psychic: 1, ice: 1, dragon: 1, dark: 1, fairy: 1 },
    fighting: { normal: 2, fighting: 1, flying:.5, poison:.5, ground: 1, rock: 2, bug:.5, ghost: 0, steel: 2, fire: 1, water: 1, grass: 1, electric: 1, psychic:.5, ice: 2, dragon: 1, dark: 2, fairy:.5 },
    flying:   { normal: 1, fighting: 2, flying: 1, poison: 1, ground: 1, rock:.5, bug: 2, ghost: 1, steel:.5, fire: 1, water: 1, grass: 2, electric:.5, psychic: 1, ice: 1, dragon: 1, dark: 1, fairy: 1 },
    poison:   { normal: 1, fighting: 1, flying: 1, poison:.5, ground:.5, rock:.5, bug: 1, ghost:.5, steel: 0, fire: 1, water: 1, grass: 2, electric: 1, psychic: 1, ice: 1, dragon: 1, dark: 1, fairy: 2 },
    ground:   { normal: 1, fighting: 1, flying: 0, poison: 2, ground: 1, rock: 2, bug:.5, ghost: 1, steel: 2, fire: 2, water: 1, grass:.5, electric: 2, psychic: 1, ice: 1, dragon: 1, dark: 1, fairy: 1 },
    rock:     { normal: 1, fighting:.5, flying: 2, poison: 1, ground:.5, rock: 1, bug: 2, ghost: 1, steel:.5, fire: 2, water: 1, grass: 1, electric: 1, psychic: 1, ice: 2, dragon: 1, dark: 1, fairy: 1 },
    bug:      { normal: 1, fighting:.5, flying:.5, poison:.5, ground: 1, rock: 1, bug: 1, ghost:.5, steel:.5, fire:.5, water: 1, grass: 2, electric: 1, psychic: 2, ice: 1, dragon: 1, dark:.5, fairy:.5 },
    ghost:    { normal: 0, fighting: 1, flying: 1, poison: 1, ground: 1, rock: 1, bug: 1, ghost: 2, steel: 1, fire: 1, water: 1, grass: 1, electric: 1, psychic: 2, ice: 1, dragon: 1, dark: 2, fairy: 1 },
    steel:    { normal: 1, fighting: 1, flying: 1, poison: 1, ground: 1, rock: 2, bug: 1, ghost: 1, steel:.5, fire:.5, water:.5, grass: 1, electric:.5, psychic: 1, ice: 2, dragon: 1, dark: 1, fairy: 2 },
    fire:     { normal: 1, fighting: 1, flying: 1, poison: 1, ground: 1, rock:.5, bug: 2, ghost: 1, steel: 2, fire:.5, water:.5, grass: 2, electric: 1, psychic: 1, ice: 2, dragon:.5, dark: 1, fairy: 1 },
    water:    { normal: 1, fighting: 1, flying: 1, poison: 1, ground: 2, rock: 2, bug: 1, ghost: 1, steel: 1, fire: 2, water:.5, grass:.5, electric: 1, psychic: 1, ice: 1, dragon:.5, dark: 1, fairy: 1 },
    grass:    { normal: 1, fighting: 1, flying:.5, poison:.5, ground: 2, rock: 2, bug:.5, ghost: 1, steel:.5, fire:.5, water: 2, grass:.5, electric: 1, psychic: 1, ice: 1, dragon:.5, dark: 1, fairy: 1 },
    electric: { normal: 1, fighting: 1, flying: 2, poison: 1, ground: 0, rock:.5, bug: 1, ghost: 1, steel: 1, fire: 1, water: 2, grass:.5, electric:.5, psychic: 1, ice: 1, dragon:.5, dark: 1, fairy: 1 },
    psychic:  { normal: 1, fighting: 2, flying: 1, poison: 2, ground: 1, rock: 1, bug: 1, ghost: 1, steel:.5, fire: 1, water: 1, grass: 1, electric: 1, psychic:.5, ice: 1, dragon: 1, dark: 2, fairy: 1 },
    ice:      { normal: 1, fighting: 1, flying: 2, poison: 1, ground: 2, rock: 1, bug: 1, ghost: 1, steel:.5, fire:.5, water:.5, grass: 2, electric: 1, psychic: 1, ice:.5, dragon: 2, dark: 1, fairy: 1 },
    dragon:   { normal: 1, fighting: 1, flying: 1, poison: 1, ground: 1, rock: 1, bug: 1, ghost: 1, steel:.5, fire: 1, water: 1, grass: 1, electric: 1, psychic: 1, ice: 1, dragon: 2, dark: 1, fairy: 0 },
    dark:     { normal: 1, fighting:.5, flying: 1, poison: 1, ground: 1, rock: 1, bug: 1, ghost: 2, steel: 1, fire: 1, water: 1, grass: 1, electric: 1, psychic: 2, ice: 1, dragon: 1, dark:.5, fairy:.5 },
    fairy:    { normal: 1, fighting: 2, flying: 1, poison:.5, ground: 1, rock: 1, bug: 1, ghost: 1, steel:.5, fire:.5, water:.5, grass: 1, electric: 1, psychic: 1, ice: 1, dragon: 2, dark: 2, fairy: 1 }
};
var _matchups = matchups;

var types = Object.keys(matchups);

var getTypesForPredicate = function(defending, p) {
    if(typeof defending === 'string')
        defending = [defending];

    var ts = [];
    types.forEach(function(attacking) {
        var multiplier = 1;
        defending.forEach(function(type) {
            multiplier *= matchups[attacking][type];
        });
        if(p(multiplier))
            ts.push(attacking);
    });

    return ts;
};

/**
 * Gets the weaknesses of a pure or dual type (e.g. 'electric' or ['grass', 'poison'])
 */
var getWeaknesses = function(defending) {
    return getTypesForPredicate(defending, function(n) {return n > 1;});
};

/**
 * Gets the resistances of a pure or dual type (e.g. 'electric' or ['grass', 'poison'])
 */
var getResistances = function(defending) {
    return getTypesForPredicate(defending, function(n) {return n < 1;});
};

/**
 * Gets the effectiveness of an attack on a pure or dual type (e.g. 'electric' or ['grass', 'poison'])
 */
var getEffectiveness = function(attacking, defending) {
    if(typeof defending === 'string')
        defending = [defending];

    var multiplier = 1;
    defending.forEach(function(type) {
        multiplier *= matchups[attacking][type];
    });

    if(multiplier > 1) {
        console.log('It\'s super effective!');
    } else if(multiplier < 1) {
        console.log('It\'s not very effective...');
    }

    return multiplier;
};

/**
 * Set a custom matchup table.
 */
var setMatchups = function(newMatchups) {
    matchups = newMatchups;
    types = Object.keys(matchups);
}

/**
 * Reset the matchup table.
 */
var resetMatchups = function() {
    setMatchups(_matchups);
}

anything.prototype.getWeaknesses = getWeaknesses;
anything.prototype.getResistances = getResistances;
anything.prototype.getEffectiveness = getEffectiveness;
anything.prototype.setMatchups = setMatchups;
anything.prototype.resetMatchups = resetMatchups;



