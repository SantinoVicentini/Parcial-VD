d3.dsv(';', '../data/agosto.csv', d3.autoType).then(data => {

  // Filtrar los datos de "RUIDOS MOLESTOS, EMANACIONES O DERRAMES"
  let ruidosMolestos = data.filter(d => d.subcategoria === 'RUIDOS MOLESTOS, EMANACIONES O DERRAMES');
  // Agrupar los datos por fecha_ingreso y contar la cantidad de casos por fecha
  let parser = d3.timeParse("%d/%m/%Y");
  let casosPorFecha = d3.group(ruidosMolestos, d => parser(d.fecha_ingreso));
  const esLocale = 'es-ES'; // definimos el locale en español
  const formatOptions = { weekday: 'long' }; // opciones de formato para obtener el nombre del día
  let ordenDias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

  let datosPorFecha = Array.from(casosPorFecha, ([fecha, datos]) => ({
    cantidad: datos.length,
    dia: new Intl.DateTimeFormat(esLocale, formatOptions).format(new Date(fecha))
  }));

  datosPorFecha.sort((a, b) => {
    return ordenDias.indexOf(a.dia) - ordenDias.indexOf(b.dia);
  });

  // Crear el gráfico de líneas utilizando los datos filtrados y agrupados
  let chart = Plot.plot({
    marks: [
      Plot.line(datosPorFecha, {x: "dia", y: "cantidad"})
    ],
    x: {
      label: "",
      domain: ordenDias,
    },
    y: {
      label: "Denuncias",
      domain: [6, 18],
      grid: true
    }
  });

  // Agregar el gráfico al elemento con el id "chart" del HTML
  d3.select('#chart').append(() => chart);
})

