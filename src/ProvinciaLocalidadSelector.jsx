import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const ProvinciaLocalidadSelector = ({ onProvinciaSelect, onLocalidadSelect }) => {
  const [provincias, setProvincias] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState(null);
  const [localidades, setLocalidades] = useState([]);

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const response = await axios.get("https://apis.datos.gob.ar/georef/api/provincias");
        console.log("Response completa:", response.data);
        
        // Ajusta la clave según la estructura real de la respuesta
        if (response.status === 200 && response.data && response.data.provincias) {
          setProvincias(response.data.provincias.map(prov => ({
            value: prov.id,
            label: prov.nombre,
          })));
        } else {
          console.error("La estructura de la respuesta no es la esperada:", response.data);
        }
      } catch (error) {
        console.error("Error fetching provincias:", error);
      }
    };

    fetchProvincias();
  }, []);

  const handleSelectChange = async (selectedOption) => {
    setSelectedProvincia(selectedOption);
    console.log("Provincia seleccionada:", selectedOption);

    if (selectedOption) {
      await fetchLocalidades(selectedOption.value); // Usa el id de la provincia
      onProvinciaSelect(selectedOption); // Llama a la función pasada por props
    }
  };

  const fetchLocalidades = async (provinciaId) => {
    try {
      const response = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinciaId}&campos=id,nombre&max=500`);
      console.log("Localidades response:", response.data);

      // Ajusta la clave según la estructura real de la respuesta
      if (response.status === 200 && response.data && response.data.municipios) {
        setLocalidades(response.data.municipios.map(loc => ({
          value: loc.id,
          label: loc.nombre,
        })));
      } else {
        console.error("La estructura de la respuesta de localidades no es la esperada:", response.data);
      }
    } catch (error) {
      console.error("Error fetching localidades:", error);
    }
  };

  const handleLocalidadChange = (selectedOption) => {
    onLocalidadSelect(selectedOption); // Llama a la función pasada por props
    console.log("Localidad seleccionada:", selectedOption);
  };

  return (
    <div>
      <h1>Provincias de Argentina</h1>
      <Select
        options={provincias}
        onChange={handleSelectChange}
        placeholder="Seleccione una provincia"
        isSearchable // Habilita la búsqueda
      />

      {localidades.length > 0 && (
        <div>
          <h2>Localidades de {selectedProvincia?.label}:</h2>
          <Select
            options={localidades}
            onChange={handleLocalidadChange}
            placeholder="Seleccione una localidad"
            isSearchable // Habilita la búsqueda
          />
        </div>
      )}
    </div>
  );
};

export default ProvinciaLocalidadSelector;
