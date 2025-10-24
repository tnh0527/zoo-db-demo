import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Heart } from "lucide-react";
import { useData } from "../data/DataContext";
import { enclosures } from "../data/mockData";

// Using real enclosures from data
const getHabitats = () => {
  return ["All Animals", ...enclosures.map(enc => enc.Enclosure_Name)];
};

export function AnimalsPage() {
  const { animals } = useData();
  const [selectedHabitat, setSelectedHabitat] = useState("All Animals");
  const habitats = getHabitats();

  // Get animals with their habitat information
  const displayedAnimals = selectedHabitat === "All Animals"
    ? animals.map(animal => ({
        name: animal.Animal_Name,
        species: animal.Species,
        gender: animal.Gender === 'M' ? 'Male' : animal.Gender === 'F' ? 'Female' : 'Unknown',
        habitat: animal.Enclosure?.Enclosure_Name || 'Unknown'
      }))
    : animals
        .filter(animal => animal.Enclosure?.Enclosure_Name === selectedHabitat)
        .map(animal => ({
          name: animal.Animal_Name,
          species: animal.Species,
          gender: animal.Gender === 'M' ? 'Male' : animal.Gender === 'F' ? 'Female' : 'Unknown',
          habitat: animal.Enclosure?.Enclosure_Name || 'Unknown'
        }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl mb-4">Our Animals</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            Meet the amazing residents of WildWood Zoo! We care for {animals.length} animals across {enclosures.length} unique habitats.
          </p>
        </div>
      </section>

      {/* Habitat Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {habitats.map((habitat) => (
              <Button
                key={habitat}
                onClick={() => setSelectedHabitat(habitat)}
                variant={selectedHabitat === habitat ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedHabitat === habitat
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-green-600 text-green-600 hover:bg-green-50"
                }`}
              >
                {habitat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Animals Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl mb-8 text-center">
            {selectedHabitat === "All Animals"
              ? `All Animals (${displayedAnimals.length})`
              : `${selectedHabitat} (${displayedAnimals.length})`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedAnimals.map((animal, index) => (
              <Card key={`${animal.name}-${index}`} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                  <Heart className="h-24 w-24 text-green-300" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{animal.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`${
                        animal.gender === 'Male' 
                          ? 'bg-teal-100 text-teal-800 border-teal-300' 
                          : animal.gender === 'Female'
                          ? 'bg-teal-100 text-teal-800 border-teal-300'
                          : 'bg-gray-100 text-gray-800 border-gray-300'
                      }`}
                    >
                      {animal.gender}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{animal.species}</p>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {animal.habitat}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-4">Animal Care at WildWood Zoo</h2>
            <p className="text-gray-600 mb-8">
              Our dedicated team of veterinarians and zookeepers provides world-class care for all our animals.
              Each habitat is carefully designed to mimic natural environments and promote animal wellbeing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="text-2xl text-green-600 mb-2">🩺</div>
                <p className="font-medium">Expert Veterinary Care</p>
                <p className="text-sm text-gray-600">24/7 medical monitoring</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="text-2xl text-green-600 mb-2">🥗</div>
                <p className="font-medium">Specialized Diets</p>
                <p className="text-sm text-gray-600">Nutrition tailored to each species</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="text-2xl text-green-600 mb-2">🌳</div>
                <p className="font-medium">Enrichment Programs</p>
                <p className="text-sm text-gray-600">Daily activities and stimulation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}