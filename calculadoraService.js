const calculadora = require("exercicio-pratico-03-pucminas/calculadora");


const calcular = function (message) {
    console.log(message.includes("+"));
    let operador = "";
    if(message.includes("+")){
        operador = "somar";
        message = message.replace("+",operador );        
    } else if(message.includes("-")){
        operador = "subtrair";
        message = message.replace("-",operador);        
    } else if(message.includes("/")){
        operador = "dividir";
        message = message.replace("/",operador);        
    }else if(message.includes("X")){
        operador = "multiplicar";
        message = message.replace("X",operador);        
    }else {
        return "Operação inválida!";
    }


    var numeros = message.split(operador);

    console.log(numeros);

    return calcularRequest(operador,numeros[0],numeros[1]);

}

const calcularRequest = function (operador, numero1, numero2){
    numero1 = tratarNumero(numero1);
    numero2 = tratarNumero(numero2);
    if(isNaN(numero1) || isNaN(numero2)){
        return "Operação inválida!";
    }
    
    let resultado = 0;
    switch (operador) {
        case 'somar':
            resultado = calculadora.soma(numero1,numero2);
        break;
        case 'subtrair':
            resultado = calculadora.subtracao(numero1,numero2);
        break;
        case 'multiplicar':
            resultado = calculadora.multiplicacao(numero1,numero2);
        break;
        case 'dividir':
            resultado = calculadora.divisao(numero1,numero2);
        break;
        default:
            return "Operação inválida!";
    }
    return resultado;
}

function tratarNumero(numero){
    let _numero = isNaN(numero)? 0 : parseInt(numero);
    return _numero;
}

module.exports  = {    
    calcular
}