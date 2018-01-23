class Negociacao{

constructor(data,quantidade,valor){

    this._data = new Date(data.getTime()); //Programçaõ Defensiva.
    this._quantidade = quantidade;
    this._valor = valor;
    //Congela o objeto. Torna o imutavel.
     Object.freeze(this);    
}


get volume(){
    return this._quantidade * this._valor;
}

get data()
{
    //Programação defenva. Quando chamaods a data devolvemos uma nova intancia de Date.
    //Isso pq o metodo Object.freeze(); é Shallow e nao deep. só funciona com o tipo valor.
  return new Date(this._data.getTime());
}

get quantidade(){
    return this._quantidade;
}

get valor(){
    return this._valor;
}
}