d3.dsv(';', '../data/ruidos_molestos.csv', d3.autoType).then(data => {

  const parseDate = d3.timeParse("%d/%m/%Y");

  let ruidosMolestos = data.filter(d => d.subcategoria === 'RUIDOS MOLESTOS, EMANACIONES O DERRAMES' && (d.tipo_prestacion === 'DENUNCIA' || d.tipo_prestacion === 'Denuncia'))
  .map(d => {
    const date = parseDate(d.fecha_ingreso);
    const mes = date.getMonth();
    let estacion;
    if (mes >= 0 && mes <= 2) {
      estacion = 'Verano';
    } else if (mes >= 3 && mes <= 5) {
      estacion = 'Otoño';
    } else if (mes >= 6 && mes <= 8) {
      estacion = 'Invierno';
    } else {
      estacion = 'Primavera';
    }
    return { ...d, estacion };
  });
  //console.log(ruidosMolestos)

  const dataAgrupada = d3.rollup(
    ruidosMolestos,
    v => v.length,
    d => d.estacion
  );

  //console.log(dataAgrupada);

  const points = Array.from(dataAgrupada, ([estacion, cantidad]) => ({ estacion, cantidad }));

  let chart = Plot.plot({
    marks: [
      Plot.areaY(points, {
        x: "estacion",
        y: "cantidad",
        fill: "#0000FF",
        fillOpacity: 0.3
      }),
      Plot.lineY(points, {
        x: "estacion",
        y: "cantidad",
        stroke: "#282828",
        strokeWidth: 2,
      }),
      Plot.ruleY([2000])   
    ],
    x: {
      label: '2021',
      domain: ['Verano', 'Otoño', 'Invierno', 'Primavera']
    },
    y: {
      label: 'Cantidad de denuncias',
      grid: true,
    },
    style: {
      "background-color": "rgb(245, 244, 241)"
    }
  });

  d3.select('#chart2').append(() => chart);

});
