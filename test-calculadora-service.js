var assert = require('assert');
const calculadoraService = require("./calculadoraService")


describe("Operador Soma", function() {
    it("a) 1 + 1", function() {
        assert.equal(calculadoraService.calcular('somar', 1,1),2);
    });

    it("b) -123 + 123123", function() {
        assert.equal(calculadoraService.calcular('somar',-123,123123),123000);
    });
});

describe("Operador Multiplicação", function() {
    it("c) 8 * 0", function() {
        assert.equal(calculadoraService.calcular("multiplicar",8,0),0);
    });

    it("d) 1239123 * 12313", function() {
        assert.equal(calculadoraService.calcular("multiplicar",1239123 ,12313),15257321499);
    });
});


describe("Operador Divisão", function() {
    it("e) 123 / -12", function() {
        assert.equal(calculadoraService.calcular("dividir",123 ,-12),-10.25);
    });

    it("f) 313123 / 0", function() {
        assert.equal(calculadoraService.calcular("multiplicar",313123  ,0),0);
    });
});




describe("Operador Subtração", function() {
    it("Subtrair dois números, sendo um deles negativo", function() {
        assert.equal(calculadoraService.calcular("subtrair",155 ,-10),165);
    });

    it("Subtrair dois números", function() {
        assert.equal(calculadoraService.calcular("subtrair",550,150),400);
    });
});


