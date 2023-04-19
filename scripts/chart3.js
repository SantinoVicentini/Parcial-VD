d3.dsv(';', '../data/ruidos_molestos.csv', d3.autoType).then(data => {

    const parseDate = d3.timeParse("%d/%m/%Y");
  
    let datosFiltrados = data.filter(d => 
      (d.domicilio_barrio === 'PALERMO' || d.domicilio_barrio === 'CABALLITO' || d.domicilio_barrio === 'RECOLETA' || d.domicilio_barrio === 'BELGRANO') &&
      (d.tipo_prestacion === 'DENUNCIA' || d.tipo_prestacion === 'Denuncia')
    ).map(d => {
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
  
    const datosAgrupados = d3.rollup(
      datosFiltrados,
      v => v.length,
      d => d.estacion,
      d => d.domicilio_barrio
    );
  
    const datosFinales = Array.from(datosAgrupados, ([estacion, valores]) => {
      const item = { estacion };
      for (const [barrio, cantidad] of valores) {
        item[barrio] = cantidad;
      }
      return item;
    });
  
console.log(datosFinales)

    let chart = Plot.plot({
      marks: [
        Plot.line(datosFinales, {
          x: 'estacion',
          y: 'PALERMO',
          stroke: '#1f77b4',
          strokeWidth: 2,
        }),
        Plot.line(datosFinales, {
          x: 'estacion',
          y: 'CABALLITO',
          stroke: '#ff7f0e',
          strokeWidth: 2,
        }),
        Plot.line(datosFinales, {
          x: 'estacion',
          y: 'RECOLETA',
          stroke: '#2ca02c',
          strokeWidth: 2,
        }),
        Plot.line(datosFinales, {
          x: 'estacion',
          y: 'BELGRANO',
          stroke: '#d62728',
          strokeWidth: 2,
        }),
        
      ],
      x: {
        label: '',
        domain: ['Verano', 'Otoño', 'Invierno', 'Primavera'],
      },
      y: {
        label: 'Cantidad de denuncias',
        grid: true,
        domain: [30, 280]
      },
    });
  
    d3.select('#chart3').append(() => chart);
  
  });
  