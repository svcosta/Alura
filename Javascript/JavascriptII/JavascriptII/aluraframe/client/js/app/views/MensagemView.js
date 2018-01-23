class MensagemView extends View{
     constructor(elemento)
    {
        super(elemento);        
    }

    //  //if ternario. Uma string quando é vazia no js, é por defult é nullo.
    template(model) {
       return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }   

    update(model) {        
        this._elemento.innerHTML = this.template(model); 
    }
} 

 

  