
import { storage } from './storage';
import { Vehicle, Client } from '../types';

export const hinovaService = {
  searchVehicle: async (plateOrChassis: string): Promise<{ vehicle: Partial<Vehicle>, client: Partial<Client> } | null> => {
    // MOCK RESPONSE PARA DEMO
    const query = plateOrChassis.toUpperCase();
    
    // Simula atraso de rede
    await new Promise(r => setTimeout(r, 800));

    return {
        client: {
            name: "CLIENTE DEMONSTRAÇÃO",
            cpf: "000.000.000-00",
            phone: "(84) 99999-0000",
            email: "demo@exemplo.com.br",
            address: "Av. Roberto Freire, 100",
            city: "Natal", state: "RN", createdAt: Date.now()
        },
        vehicle: {
            plate: query.length === 7 ? query : "ABC1D23",
            chassis: "9BWZZZ37ZDEMO001",
            model: "VW GOL (MOCK) 1.6 MSI",
            year: "2023", fipeCode: "005342-1",
            type: "cat-car", status: 'active'
        }
    };
  }
};
