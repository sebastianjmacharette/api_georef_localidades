import React, { useState } from "react";
import ProvinciaLocalidadSelector from "./ProvinciaLocalidadSelector"; // Asegúrate de que la ruta sea correcta
import jsonCodigosPostales from "./jsoncodigospostales.json"; // Importa el JSON

const App = () => {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState(null);
  const [codigoPostal, setCodigoPostal] = useState(null); // Estado para almacenar el código postal

  const handleProvinciaSelect = (provincia) => {
    setProvinciaSeleccionada(provincia);
    setCodigoPostal(null); // Resetear el código postal al seleccionar una nueva provincia
  };

  const handleLocalidadSelect = (localidad) => {
    setLocalidadSeleccionada(localidad);
    buscarCodigoPostal(provinciaSeleccionada, localidad); // Buscar el código postal cuando se selecciona la localidad
  };

  const buscarCodigoPostal = (provincia, localidad) => {
    if (provincia && localidad) {
      // Normalizar las cadenas para la comparación
      const provinciaNormalizada = provincia.label.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos
      const localidadNormalizada = localidad.label.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos

      // Buscar en el JSON
      const resultado = jsonCodigosPostales.find((item) => {
        const nombreNormalizado = item.nombre.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normalizar nombre
        const provinciaItemNormalizada = item.provincia.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normalizar provincia
        return nombreNormalizado === localidadNormalizada && provinciaItemNormalizada === provinciaNormalizada; // Comparar
      });

      // Si hay un resultado, establecer el código postal
      if (resultado) {
        setCodigoPostal(resultado.cod_postal);
      } else {
        setCodigoPostal(null); // Si no hay coincidencias, resetear el código postal
      }
    }
  };

  return (
    <div>
      <h1>Formulario de Selección</h1>
      <ProvinciaLocalidadSelector
        onProvinciaSelect={handleProvinciaSelect}
        onLocalidadSelect={handleLocalidadSelect}
      />
      <div>
        {provinciaSeleccionada && (
          <p>Provincia seleccionada: {provinciaSeleccionada.label}</p>
        )}
        {localidadSeleccionada && (
          <p>Localidad seleccionada: {localidadSeleccionada.label}</p>
        )}
        {codigoPostal !== null && (
          <p>Código postal: {codigoPostal}</p> // Mostrar el código postal encontrado
        )}
      </div>
    </div>
  );
};

export default App;
