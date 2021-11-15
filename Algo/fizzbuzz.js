const fizzbuzz = (number) => {
    let display = ((number % 3 === 0) ? "Fizz" : "") + ((number % 5 === 0) ? "Buzz" : "");
    return (display.length > 0) ? display : number;
}

for(i = 1; i <= 100; i++) {
    console.log(fizzbuzz(i));
}