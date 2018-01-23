
/*
O principal erro deste código está na função passada para setTimeout, aonde fazemos o this.segundos++. 
Como setInterval é global e acessível em qualquer canto do nosso código, ele pertence ao objeto global window, 
logo seu this aponta para window e não para nossa classe Relogio. Como window não possui a propriedade _segundos,
 o incremento resultará em NaN, pois não podemos incrementar uma variável que é undefined.

Uma maneira de resolver esse problema é guardando o this do constructor em uma variável, 
por exemplo, self e acessá-la quando necessário. Vejamos: */
// class Relogio {

//     constructor() {
//         this._segundos = 0;

//         // setInterval(function () {
//         //     console.log(++this._segundos);
//         //   }, 1000);

//          setInterval(function () {
//             console.log(()=>{ return ++this._segundos;});
//           }, 1000);
//     }
// }

class Relogio {

    constructor() {
        this._segundos = 0;
        setInterval(() => console.log(++this._segundos), 1000); // usando arrow function. O this é o this de `Relogio`, e não `window`. 
    }
}