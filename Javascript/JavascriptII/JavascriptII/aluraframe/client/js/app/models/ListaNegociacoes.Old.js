class ListaNegociacoes{

    // constructor(contexto, armadilha) {
    //     this._negociacoes = [];
    //     this._armadilha = armadilha;
    //     this._contexto = contexto;
    // }

     constructor(armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;       
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);

        debugger

        //1 param: a função que queremos executar
        //2 param: o Contexto onde queremos executar ou seja o this_contexto passa a ser o this em tempo de exeucaçao
        //3 param: sao os paramtros que função armadilha devem receber, no nosso caso listaNegaociao, entao vai ser o this.
        //  Reflect.apply(this._armadilha, this._contexto, [this]);
        //meu exemplo:Reflect.apply((nome)=> {alert('oi ' + nome);}, this,['sergio']);

        //Arrow Funcitons tem o conteto lexico, ou seja, ele preserva o contexto que foi criada,
        //diferente das funções tradicionais nao tem o this dinamico, e sim estatico.
        this._armadilha(this);
    }


    get  negociacoes(){
        //programação defensiva
        // cria um novo array com [] e concatena com o conteúdo de this._negociacoes, resultando em um novo array
        return [].concat(this._negociacoes);
    }

    /// <signature>
	/// esvazia a lista
	/// </signature>
    esvazia(){
        this._negociacoes = [];
        this._armadilha(this);
    }
}

