d3.csv('astronautas.csv', d3.autoType).then(data => {

  // Encontrar el valor máximo de mision_hs
  const maxMisionHs = d3.max(data, d => d.mision_hs);

  // Definir la escala y el formateador personalizado
  const yScale = d3.scaleLinear()
    .domain([0, 80000])
    .range([550, 0]);

  const yFormatter = d3.format(".2s");

  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    marks: [
      Plot.areaY(data, Plot.groupX({y: "sum"},{x: "anio_mision", y: "mision_hs" , fill: "#333333", fillOpacity: 0.5})),
      Plot.lineY(data, Plot.groupX({y: "sum"}, {x: "anio_mision", y: "mision_hs", stroke: "#000", strokeWidth: 1})),
      Plot.ruleY([100000]),


      // Agregar la marca Plot.dot para el punto más alto
      Plot.dot(data.filter(d => d.mision_hs === maxMisionHs), {
        x: "anio_mision",
        y: "mision_hs",
        stroke: "#0000FF",
        size: 10,
        dy: -340 // Mover el punto más alto hacia arriba
      }),

      // Agregar el texto al lado del punto más alto
      Plot.text(data.filter(d => d.mision_hs === maxMisionHs), {
        x: "anio_mision",
        y: "mision_hs",
        text: d => '78324 hs en mision',
        textAnchor: "start",
        dx: 15,
        dy: -340 // Mover el texto hacia arriba
      })
    ],
    style: {
      fontFamily:"arial",
      fontSize:12,
    },
    x: {
      label: 'Año (→)'
    },
    y: {
      label: 'Cantidad Total De Hs En Mision, en miles (↑)',
      labelOffset: 50,
      grid: true,
      tickFormat: d => yFormatter(d/1000) ,
      scale: yScale,
    },
    width: 900,
    height: 550,
    marginLeft: 50,
})

  d3.select('#chart').append(() => chart)
})
