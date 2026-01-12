
export const plateLookupService = {
  lookup: async (plate: string) => {
    await new Promise(r => setTimeout(r, 600));
    return {
        plate: plate.toUpperCase(),
        brand: "VOLKSWAGEN",
        model: "VW GOL 1.0 FLEX",
        year: "2022",
        color: "BRANCO",
        found: true,
        suggestedCategoryId: "cat-car"
    };
  }
};
