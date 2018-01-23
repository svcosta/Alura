class NegociacaoController {

  constructor(){
    
         //Em javascript podemos colocar funções em varivaveis
       let $ = document.querySelector.bind(document); //realiza uma associação. 


    //para não ficar percorrendo o DOM toda hora, 
    //definimos os campo na construçao da classe.
    //Excelente! Podemos incluir zilhões de negociações e nosso código só 
    //passeará pelo DOM apenas uma vez. Agora podemos criar uma instância de Negociacao.      
       this._inputData = $('#data');
       this._inputQuantidade = $('#quantidade');
       this._inputValor = $('#valor');   

        //  this._listaNegociacoes = new Bind(
        //         new ListaNegociacoes(), 
        //         new NegociacoesView($('#negociacoesView')), 
        //         'adiciona', 'esvazia', 'ordena', 'reverte');

    this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView(negociacoesView), 
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

      /* this._negociacoesView = new NegociacoesView($('#negociacoesView'));      
      
      // //com Arrow Funciton: arrow function com seu escopo léxico  
      //   this._listaNegociacoes = new ListaNegociacoes(model =>  this._negociacoesView.update(model));

      //=============== USANDO PROXY ====================================//
      //O proxy encapsula um objeto dentro dele. 
      //Primerio parmetro o objeto que queremos encapsular, o segundo é um objeto literal
      //que queremos interceptar.
      //let proxy = new Proxy(neg,{});
      let self = this; // guarda em uma variável o valor de this
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
          //target:objeto que queremos encapsular:no caso negociacao
            //prop: a propriedade no target que queremos intercpetar
            //receiver:referencia ao nosso proxy
            get(target, prop, receiver) {//target[prop] verificamos se o tipo da propriedade é igual a funcção   
                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) === typeof(Function)) {
                    return function() {
                        console.log(`método '${prop}' interceptado`);
                        Reflect.apply(target[prop], target, arguments);

                        // acessa o self que a instância de NegociacoesController
                        self._negociacoesView.update(target);
                    }
                }// só executa se não for função

                return Reflect.get(target, prop, receiver);   
            }
        });
                             
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));  */   


         this._ordemAtual = ''; // quando a página for carregada, não tem critério. Só passa a ter quando ele começa a clicar nas colunas  
  }

    adicionar(event)
    {       
        event.preventDefault();   

        // let data = this._inputData.value.split('-').map(function(item, idx){           
        //     return item - idx %2;
        // });

        //Arrow(flache) Functions:Semelhante ao metodo anonimo do C#, delega

        //expressao lambda
        // var msg = ()=>{alert('booz');};
        // msg();
   
        // let data = new Date(parametros[0], parametros[1], parametros[2]);
        //Usando o operdao spred
        // let data = new Date(...parametros);
        //criando uma instância da negociação
         try{
              let neg = this._criaNegociacao();
              this._listaNegociacoes.adiciona(neg);         

                // nova mensagem e atualizado a view
              this._mensagem.texto = 'Negociação adicionada com sucesso';
              this._mensagemView.update(this._mensagem);

              this._limpaFormulario();
              this._listaNegociacoes.negociacoes.length = 0; //teste para tentar manipuar a lista
      
      //nao preciamos mais dessa lista
      //  this._negociacoesView.update(this._listaNegociacoes);
       } catch(erro) {
            this._mensagem.texto = erro;
        }

    }

    _criaNegociacao()
    {
       return new Negociacao(DateHelper.textoParaData(this._inputData.value),
                                 this._inputQuantidade.value,
                                 this._inputValor.value);
    }
    
  
      
      /*
        onreadystatechange:
        passo a passo do state da requição:
        0: requisição ainda não iniciada
        1: conexão com o servidor estabelecida
        2: requisição recebida
        3: processando requisição
        4: requisição concluída e a resposta esta pronta
       */
   importaNegociacoes() {   
     
     let service = new NegociacaoService();
        service
            .obterNegociacoes()
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro);      
   }

    apaga(){       
        //esvazia a lista 
        this._listaNegociacoes.esvazia();
         // atualiza a view
        this._negociacoesView.update(this._listaNegociacoes);

        // exibe uma nova mensagem
        this._mensagem.texto = "Negociações removidas com sucesso";
        // atualiza a view
       // this._mensagemView.update(this._mensagem);
    }

    _limpaFormulario(){
      this._inputData.value ='';
      this._inputData.focus();
      this._inputQuantidade.value = 1;
      this._inputValor.value = 0.0;
    }

     
    
    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
        }
        this._ordemAtual = coluna;
    }
}