import React, { useState } from "react";
import ProvinciaLocalidadSelector from "./ProvinciaLocalidadSelector"; // Asegúrate de que la ruta sea correcta

const App = () => {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState(null);

  const handleProvinciaSelect = (provincia) => {
    setProvinciaSeleccionada(provincia);
  };

  const handleLocalidadSelect = (localidad) => {
    setLocalidadSeleccionada(localidad);
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
      </div>
    </div>
  );
};

export default App;
