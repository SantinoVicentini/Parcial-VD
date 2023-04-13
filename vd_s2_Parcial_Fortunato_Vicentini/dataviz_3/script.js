d3.csv('astronautas.csv', d3.autoType).then(data => {
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    marks: [
      Plot.line(
        data, 
        Plot.groupX({y: 'sum'}, {
            x: "anio_mision",
            y: "mision_hs",
            stroke: "genero",
            strokeWidth: 3,
            curve: "linear"
        })
      )
    ],
    style: {
      fontFamily:"arial",
      fontSize:12,
    },
    x: {
      label: 'Año (→)',
    },
    y: {
      grid: true,
      label: 'Hs En Mision, en miles (↑)',
      tickFormat: (d) => d/1000
    },
    width: 715, 
    height: 400, 
    x: { ticks: 3 }, 
    marginLeft: 50, 
    color: {
      legend: true,
      width: 714,
      columns: "120px"
    }
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
