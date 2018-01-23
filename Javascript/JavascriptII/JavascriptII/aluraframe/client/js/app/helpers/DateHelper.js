class DateHelper{

    constructor(){
        //programação denfensiva.
        throw new Error('Essa classe não pode ser instanciada');
    }

    static dataParaTexto(data){
        //templete String, nada de concatenar
    return   `${data.getDate()}/${(data.getMonth()+1)}/${data.getFullYear()}`;
    }

    static textoParaData(anoMesDia){

    //validando o formarda da data com regex
    if(!/\d{4}-\d{2}-\d{2}/.test(anoMesDia))
        throw new Error('Deve estar no formado yyyy-MM-dd');

      return  new Date(...
                    anoMesDia.split('-')
                    .map((item,index)=>
                        item - index % 2
                    ));
    }
}