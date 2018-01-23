class NegociacoesView extends View{
    constructor(elemento) {
        super(elemento);
    }

     template(model) {
        return `<table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th onclick="negociacaoController.ordena('data')">DATA</th>
                            <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                            <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                            <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${
                        model.negociacoes.map(n => 
                             `
                                <tr>
                                    <td>${DateHelper.dataParaTexto(n.data)}</td>
                                    <td>${n.quantidade}</td>
                                    <td>${n.valor}</td>
                                    <td>${n.volume}</td>
                                </tr>
                                `
                         ).join('')
                    }
                    </tbody>
                     <tfoot>
                        <td colspan="3"></td>
                        <td>
                            
                             ${model.volumeTotal}
                        </td>
                    </tfoot>
                </table>
            `;
    }

    update(model){
        //innerHTML transforma string em um elemento do DOM.
        this._elemento.innerHTML = this.template(model);
    }
}

/**
 * NOTAS
 * join()retorna um array em uma string. 
 * join('')retornar todos os elemenentos do array sem separação. todos coladinhos.
 * concat: devolve uma copia do array
 * array.concat(array2): faz um merge do array com array1.
 * falando arrow function qunado executamos apenas uma instruçao nao precisamos de uar {} e da para retunr.
 * reduce: estamos lançando mao da progração funcional mais uma vez. reduce é um função que devolve um unico
 * valor do array. tem dois parametros:
 *                           1- O primeiro é um funcção que recebe dois parametros sendo o primeiro
 *                              uma variavel que queremos armazenar algum valor, e o segundo parametros é variavel 
 *                              de iteração dos elementos.
 *                           2- Segundo: é o inicializador da varivel que queramos armazedar
 *                              exe:numeros.reduce((total, num) => total * num , 1);


 ${model.negociacoes.reduce((total, n) => total + n.volume, 0.0)}
 */