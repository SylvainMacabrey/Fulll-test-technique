const input = [ 1, 2, 3, 9, 9 ];

const increment = (input, level) => {
    // si le niveau est -1, nous cassons et mettons 1 au début du tableau
    if (level < 0) return input.unshift(1);
    // on incrémente le chiffre courant
    input[level]++;
    // si le nouveau chiffre est 10, on le met à 0, puis on appel la fonction décrémentant le niveau
    if (input[level] === 10) {
        input[level] = 0;
        increment(input, level - 1);
    }
}

increment(input, input.length - 1);
console.log(input);