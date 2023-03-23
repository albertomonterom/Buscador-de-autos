//Campos del formulario
const inputMarca = document.querySelector('#marca');
const inputYear = document.querySelector('#year');
const inputMinimo = document.querySelector('#minimo');
const inputMaximo = document.querySelector('#maximo');
const inputPuertas = document.querySelector('#puertas');
const inputTransmision = document.querySelector('#transmision');
const inputColor = document.querySelector('#color');

//Crear autoObj
const autoObj = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//UI
const formulario = document.querySelector('#buscador');
const resultado = document.querySelector('#resultado');
const btnReset = document.querySelector('#btnReset');

//Eventos
eventListeners();
function eventListeners(){
    //El evento change se dispara cuando se cambia una option de algun select en este caso
    inputMarca.addEventListener('change', datosAuto);
    inputYear.addEventListener('change', datosAuto);
    inputMinimo.addEventListener('change', datosAuto);
    inputMaximo.addEventListener('change', datosAuto);
    inputPuertas.addEventListener('change', datosAuto);
    inputTransmision.addEventListener('change', datosAuto);
    inputColor.addEventListener('change', datosAuto);

    btnReset.addEventListener('click', e => {
        e.preventDefault();

        formulario.reset();
        autoObj.marca = '';
        autoObj.year = '';
        autoObj.minimo = '';
        autoObj.maximo = '';
        autoObj.puertas = '';
        autoObj.transmision = '';
        autoObj.color = '';
        mostrarAutos(autos);
    });
}

//Funciones
mostrarYears();
function mostrarYears(){
    const year = document.querySelector('#year');
    const arr = [...autos].map(item => item.year).filter((year, position, array) => array.indexOf(year) === position).sort((a, b) => b - a);
    arr.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item;
        year.appendChild(option);
    });
}

function datosAuto(e){
    autoObj[e.target.id] = e.target.value;
    filtrarAutos();
}
mostrarAutos(autos);
function mostrarAutos(array){
    //Limpiar autos
    limpiarAutos();

    //Iterar sobre el array
    array.forEach(auto => {
        const p = document.createElement('p');
        p.innerHTML = `${auto.marca} ${auto.modelo} - ${auto.year} - PUERTAS: ${auto.puertas} - TRANSMISION: ${auto.transmision} - $${auto.precio} - COLOR: ${auto.color}`;
        resultado.appendChild(p);
    });
}
function filtrarAutos(){
    const filtrar = [...autos].filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if(filtrar.length){
        mostrarAutos(filtrar);
        return;
    }

    //0 es un valor falsy
    const alerta = document.createElement('p');
    alerta.textContent = 'No se encontraron coincidencias de su búsqueda';
    limpiarAutos();
    resultado.appendChild(alerta);
}
function filtrarMarca(auto){
    if(autoObj.marca){
        return autoObj.marca === auto.marca;
    }
    return auto;
}
function filtrarYear(auto){
    if(autoObj.year){
        return Number(autoObj.year) === auto.year;
    }
    return auto;
}
function filtrarMinimo(auto){
    if(autoObj.minimo){
        return auto.precio >= autoObj.minimo;
    }
    return auto;
}
function filtrarMaximo(auto){
    if(autoObj.maximo){
        return auto.precio <= autoObj.maximo;
    }
    return auto;
}
function filtrarPuertas(auto){
    if(autoObj.puertas){
        return Number(autoObj.puertas) === auto.puertas;
    }
    return auto;
}
function filtrarTransmision(auto){
    if(autoObj.transmision){
        return autoObj.transmision === auto.transmision;
    }
    return auto;
}
function filtrarColor(auto){
    if(autoObj.color){
        return autoObj.color === auto.color;
    }
    return auto;
}

function limpiarAutos(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}