class Bind {

///...props: Parametros rest, tem que ser o ultimo Parametro.
    constructor(model, view, ...props) {

       let proxy = ProxyFactory.create(model, props, model => {
           view.update(model)
       }); 

       view.update(model);

       /*Um ponto curioso na linguagem JavaScript é que um construtor pode retornar um objeto de um tipo diferente 
       da classe na qual o construtor foi definido */
       return proxy;
    }
}