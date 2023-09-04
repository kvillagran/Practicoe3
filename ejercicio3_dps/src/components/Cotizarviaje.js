import React, { useState } from 'react';

function Cotizarviaje() {
  const [destino, setDestino] = useState('');
  const [numeropersonas, setNumeropersonas] = useState(1);
  const [costototal, setCostototal] = useState(0);
  const [porcentajeimp, setPorcentajeimp] = useState(0);
  const [impuesto, setImpuesto] = useState(0);
  const [preciosinimp, setPreciosinimp] = useState(0);

  const precioPaquetes = {
    'Ciudad de Panamá': {
      'individual': 197,
      '2 personas': 165,
      '3 a 4 personas': 149,
      '5 personas o más': 129,
    },
    'Cancún Mexico': {
      'individual': 485,
      '2 personas': 439,
      '3 a 4 personas': 400,
      '5 personas o más': 380,
    },
    'Santiago de Chile': {
      'individual': 198,
      '2 personas': 178,
      '3 a 4 personas': 158,
      '5 personas o más': 138,
    },
    'Machu Pichu Peru': {
      'individual': 754,
      '2 personas': 699,
      '3 a 4 personas': 649,
      '5 personas o más': 629,
    },
    'Roatan Honduras': {
      'individual': 565,
      '2 personas': 499,
      '3 a 4 personas': 469,
      '5 personas o más': 449,
    },
  };

  const impDestino = {
    'Ciudad de Panamá': 4.5,
    'Cancún Mexico': 6,
    'Santiago de Chile': 7,
    'Machu Pichu Peru': 7.5,
    'Roatan Honduras': 4,
  };

  const calculateCostototal= () => {
    if (destino && precioPaquetes[destino]) {
      let precio;
      if (numeropersonas >= 5) {
        precio = precioPaquetes[destino]['5 personas o más'];
      } else if (numeropersonas >= 3) {
        precio = precioPaquetes[destino]['3 a 4 personas'];
      } else if (numeropersonas >= 2) {
        precio = precioPaquetes[destino]['2 personas'];
      } else {
        precio = precioPaquetes[destino]['individual'];
      }

      const impuesto = (precio * numeropersonas * impDestino[destino]) / 100;
      const preciosinimp = precio * numeropersonas;
      const precioTotal = precio * numeropersonas + impuesto;
      setCostototal(precioTotal);
      setPorcentajeimp(impDestino[destino]); 
      setImpuesto(impuesto);
      setPreciosinimp(preciosinimp);
    } else {
      setCostototal(0);
      setPorcentajeimp(0);
      setImpuesto(0);
      setPreciosinimp(0);
    }
  };

  return (
    <div class="Contenedor">
      <img class="avion" src="https://cdn-icons-png.flaticon.com/512/1974/1974031.png"/>
      <h1 class="titulo">Travel World</h1>
      <h2 class="cotiza">Cotiza el paquete de tu viaje</h2>
      <div class="formulario-contenedor">
      <form>
        <div>
          <label>Destino: </label>
          <select value={destino} onChange={(e) => setDestino(e.target.value)}>
            <option value="">Seleccione un destino</option>
            {Object.keys(precioPaquetes).map((destino) => (
              <option key={destino} value={destino}>
                {destino}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Cantidad de Personas: </label>
          <input
            type="number"
            min="1"
            value={numeropersonas}
            onChange={(e) => setNumeropersonas(e.target.value)}
          />
        </div>
        <button type="button" onClick={calculateCostototal}>
          Calcular
        </button>
      </form>
      </div>
      <div class="resumen-contenedor">
        {costototal > 0 && (
          <div>
            <h2 class="resumenpaquete">Resumen del Paquete:</h2>
            <p>Nombre del Destino: {destino}</p>
            <p>Cantidad de Personas: {numeropersonas}</p>
            <p>Costo del Paquete por Persona: ${(costototal-impuesto) / numeropersonas}</p>    
            <p>Costo total sin impuesto: ${preciosinimp}</p>  
            <p>Impuesto por Persona ({porcentajeimp}%), Impuesto total: ${preciosinimp*(porcentajeimp/100)}</p>
            <p class="total">Total a Pagar: ${costototal}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cotizarviaje;