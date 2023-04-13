d3.csv('astronautas.csv', d3.autoType).then(data => {
    let eva_mision_hs_filtrado = data.filter(astronauta => astronauta.eva_mision_hs >= 15);
    // Guardamos el svg generado en la variable chart
    
    let chart = Plot.plot({
      marks: [
        Plot.barX(eva_mision_hs_filtrado, {
          x: 'eva_mision_hs',
          y: 'nombre',
          fill: '#333333',
          fillOpacity: 0.5,
          sort: { y: "x" , reverse: true},
          
        }),
        
      ],
      style: {
        fontFamily:"arial",
        fontSize:12,
      },
      x: {
        grid: true,
        label: 'Mision Evacuacion Hs (→) ',
        labelOffset: 30
      },
      y: {
        label: "Nombre (→) ",
        labelOffset: 180
      },
      height: 500,
      width: 900,
      marginLeft: 200,
      marginTop: 40,
      marginBottom: 40,
    })
    // Agregamos chart al div#chart de index.html
    d3.select('#chart').append(() => chart)
  })

/* ↑ → */
