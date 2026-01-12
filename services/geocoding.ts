
export const geocodingService = {
  reverseGeocode: async (lat: number, lon: number): Promise<string> => {
    // MOCK GEOPOSITION
    const mockAddresses = [
        "Av. Hermes da Fonseca, 1200 - Tirol, Natal - RN",
        "Rua Mossoró, 450 - Petrópolis, Natal - RN",
        "Av. Engenheiro Roberto Freire, 500 - Ponta Negra, Natal - RN",
        "Rua Potengi, 20 - Ribeira, Natal - RN"
    ];
    
    // Retorna um endereço aleatório da lista para a demo
    return mockAddresses[Math.floor(Math.random() * mockAddresses.length)];
  }
};
