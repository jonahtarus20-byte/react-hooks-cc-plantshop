import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then(setPlants);
  }, []);

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleUpdatePlant = (updatedPlant) => {
    setPlants(plants.map((p) => (p.id === updatedPlant.id ? updatedPlant : p)));
  };


  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search search={search} onSearchChange={setSearch} />
      <PlantList plants={filteredPlants} onUpdatePlant={handleUpdatePlant} />
    </main>
  );
}

export default App;
