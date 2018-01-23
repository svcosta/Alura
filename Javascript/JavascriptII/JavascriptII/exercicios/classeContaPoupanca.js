class ContaPoupanca extends Conta{   

    atualizar(taxa){
        
        return this._saldo + (taxa * 2);
    }
} 