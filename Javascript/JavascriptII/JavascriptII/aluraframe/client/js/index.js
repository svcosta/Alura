var campos = [
    document.querySelector('#data'),
    document.querySelector('#valor'),
    document.querySelector('#quantidade')
];

console.log(campos);

var tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit',function(event){

    //Tira, cancela  o coportamento pradro do formulario.
    event.preventDefault();

    //cria uma tr que não possui colunas
    var tr = document.createElement('tr');

    //criaremos as colunas (td) da nossa linha
    campos.forEach(function(campo){
        
        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);

    });
    
    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    tr.appendChild(tdVolume);

    tbody.appendChild(tr);
    
    campos[0].value = '';
    campos[1].value = 1; 
    campos[2].value = 0;

    campos[0].focus();
})