let cantidadPaquetes = 0;
let paquetes = [];
let paqueteActual = 0;
let fase1Data = [];
let fase2Data = [];
let fase3Data = [];
let indiceFase2 = 0;
let indiceFase3 = 0;
function mostrarRazonesMuerte() {
    const estadoCangrejas = document.getElementById('estadoCangrejas').value;
    const razonesMuerteContainer = document.getElementById('razonesMuerteContainer');

    if (estadoCangrejas === 'Muertas') {
        razonesMuerteContainer.style.display = 'block';
    } else {
        razonesMuerteContainer.style.display = 'none';
    }
}

function iniciarIngresoPaquetes() {
    cantidadPaquetes = parseInt(document.getElementById('cantidadPaquetes').value);
    if (cantidadPaquetes > 0) {
        document.getElementById('formularioPaquete').style.display = 'block';
        document.getElementById('numeroPaquete').textContent = 1;
  
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        alert("Ingrese una cantidad válida de contenedores.");
    }
}


function guardarPaquete() {
    let tamaño = document.getElementById('tamaño').value;
    let apariencia = document.getElementById('apariencia').value;
    let peso = document.getElementById('peso').value;
    let cantidadCangrejas = document.getElementById('cantidadCangrejas').value;
    let estadoCangrejas = document.getElementById('estadoCangrejas').value;
    let razonesMuerte = document.getElementById('razonesMuerte').value;
    let clasificacion = document.getElementById('clasificacion').value;

    if (!tamaño || !peso || !cantidadCangrejas) {
        alert("Todos los campos numéricos son obligatorios y deben ser mayores que 0.");
        return;
    }

    let paquete = {
        tamaño: tamaño,
        apariencia: apariencia,
        peso: peso,
        cantidadCangrejas: cantidadCangrejas,
        estadoCangrejas: estadoCangrejas,
        razonesMuerte: estadoCangrejas === 'Muertas' ? razonesMuerte : null,
        clasificacion: clasificacion
    };

    paquetes.push(paquete);
    paqueteActual++;

    if (paqueteActual < cantidadPaquetes) {
        document.getElementById('numeroPaquete').textContent = paqueteActual + 1;
        document.getElementById('tamaño').value = '';
        document.getElementById('peso').value = '';
        document.getElementById('cantidadCangrejas').value = '';
        document.getElementById('razonesMuerte').value = '';
        mostrarRazonesMuerte();
    } else {
        document.getElementById('formularioPaquete').style.display = 'none';
        document.getElementById('fases').style.display = 'block';
        alert("Todos los contenedores han sido ingresados.");
    }
}


function fase1() {
    fase1Data = paquetes.map((paquete, index) => ({
        ...paquete,
        estado: paquete.estadoCangrejas === 'Muertas' ? 'Devuelto' : 'Aceptado'
    }));
    mostrarReporteFase1();
    alert('Fase 1 completada.');
}


function mostrarFormularioFase2() {
    if (indiceFase2 < fase1Data.length) {
        document.getElementById('formularioFase2').style.display = 'block';
        document.getElementById('numeroPaqueteFase2').textContent = indiceFase2 + 1;
      
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        alert("Todos los paquetes han sido procesados en la Fase 2.");
    }
}


function guardarFase2() {
    let unidadesCocinadas = document.getElementById('unidadesCocinadas').value;
    let detallesCoccion = document.getElementById('detallesCoccion').value;

    if (!unidadesCocinadas || isNaN(unidadesCocinadas)) {
        alert("Debe ingresar un número válido para las unidades cocinadas.");
        return;
    }

    unidadesCocinadas = parseInt(unidadesCocinadas);

    if (unidadesCocinadas > fase1Data[indiceFase2].cantidadCangrejas) {
        alert(`No puede cocinar más unidades (${unidadesCocinadas}) de las que hay en el contenedor (${fase1Data[indiceFase2].cantidadCangrejas}).`);
        return;
    }

    if (unidadesCocinadas <= 0) {
        alert("Las unidades cocinadas deben ser mayores que 0.");
        return;
    }

    if (!detallesCoccion) {
        alert("Debe ingresar los detalles de la cocción.");
        return;
    }

    fase2Data.push({
        ...fase1Data[indiceFase2],
        unidadesCocinadas: unidadesCocinadas,
        detallesCoccion: detallesCoccion
    });

    document.getElementById('unidadesCocinadas').value = '';
    document.getElementById('detallesCoccion').value = '';

    indiceFase2++;

    if (indiceFase2 < fase1Data.length) {
        document.getElementById('numeroPaqueteFase2').textContent = indiceFase2 + 1;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        document.getElementById('formularioFase2').style.display = 'none';
        mostrarReporteFase2();
        alert('Fase 2 completada.');
    }
}

function fase3() {
    if (fase2Data.length === 0) {
        alert("Primero debe completar la Fase 2.");
        return;
    }

    if (indiceFase3 < fase2Data.length) {
        document.getElementById('formularioFase3').style.display = 'block';
        document.getElementById('numeroPaqueteFase3').textContent = indiceFase3 + 1;
     
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        alert("Todos los paquetes han sido procesados en la Fase 3.");
    }
}


function guardarFase3() {
    let unidadesExportadas = document.getElementById('unidadesExportadas').value;
    let destino = document.getElementById('destino').value;
    let precio = document.getElementById('precio').value;

    if (!unidadesExportadas || isNaN(unidadesExportadas)) {
        alert("Debe ingresar un número válido para las unidades exportadas.");
        return;
    }
    unidadesExportadas = parseInt(unidadesExportadas);

    if (unidadesExportadas > fase2Data[indiceFase3].unidadesCocinadas) {
        alert(`Las unidades exportadas (${unidadesExportadas}) no pueden ser mayores que las unidades cocinadas (${fase2Data[indiceFase3].unidadesCocinadas}).`);
        return;
    }

    if (unidadesExportadas <= 0) {
        alert("Las unidades exportadas deben ser mayores que 0.");
        return;
    }

    if (!destino || destino.trim() === "") {
        alert("Debe ingresar un destino válido.");
        return;
    }

    if (!precio || isNaN(precio)) {
        alert("Debe ingresar un precio válido.");
        return;
    }
    precio = parseFloat(precio);

    if (precio <= 0) {
        alert("El precio debe ser mayor que 0.");
        return;
    }

    fase3Data.push({
        ...fase2Data[indiceFase3],
        unidadesExportadas: unidadesExportadas,
        destino: destino,
        precio: precio
    });

    document.getElementById('unidadesExportadas').value = '';
    document.getElementById('destino').value = '';
    document.getElementById('precio').value = '';

    indiceFase3++;

    if (indiceFase3 < fase2Data.length) {
        document.getElementById('numeroPaqueteFase3').textContent = indiceFase3 + 1;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        document.getElementById('formularioFase3').style.display = 'none';
        mostrarReporteFase3();
        alert('Fase 3 completada.');
    }
}


function mostrarReporteFase1() {
    let reporte = "<h3>Reporte Fase 1</h3><ul>";
    fase1Data.forEach((paquete, index) => {
        reporte += `
            <li>Paquete ${index + 1}: 
                Tamaño: ${paquete.tamaño}cm³, 
                Apariencia: ${paquete.apariencia}, 
                Peso: ${paquete.peso}kg, 
                Cantidad: ${paquete.cantidadCangrejas} unidades, 
                Estado: ${paquete.estadoCangrejas}, 
                ${paquete.estadoCangrejas === 'Muertas' ? `Razones de muerte: ${paquete.razonesMuerte}` : ''}, 
                Clasificación: ${paquete.clasificacion}
            </li>`;
    });
    reporte += "</ul>";
    document.getElementById('reporteFase1').innerHTML = reporte;
}


function mostrarReporteFase2() {
    let reporte = "<h3>Reporte Fase 2</h3><ul>";
    fase2Data.forEach((paquete, index) => {
        reporte += `
            <li>Paquete ${index + 1}: 
                Unidades cocinadas: ${paquete.unidadesCocinadas} unidades, 
                Detalles cocción: ${paquete.detallesCoccion}
            </li>`;
    });
    reporte += "</ul>";
    document.getElementById('reporteFase2').innerHTML = reporte;
}


function mostrarReporteFase3() {
    let reporte = "<h3>Reporte Fase 3</h3><ul>";
    fase3Data.forEach((paquete, index) => {
        reporte += `
            <li>Paquete ${index + 1}: 
                Unidades exportadas: ${paquete.unidadesExportadas} unidades, 
                Destino: ${paquete.destino}, 
                Precio: $${paquete.precio.toFixed(2)} por unidad
            </li>`;
    });
    reporte += "</ul>";
    document.getElementById('reporteFase3').innerHTML = reporte;
}