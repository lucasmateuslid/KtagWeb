
import { Tag, KTagLocationResult } from '../types';

export const fetchTagLocation = async (tag: Tag): Promise<KTagLocationResult[]> => {
  // SIMULAÇÃO DE RASTREIO (MOCK DINÂMICO)
  // Usa o ID da tag para gerar uma semente única, espalhando os veículos por Natal/RN
  const tagHash = tag.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const baseLat = -5.791008;
  const baseLon = -35.208888;
  
  // Offset fixo baseado no ID para que cada carro apareça em um lugar
  const latOffset = ((tagHash % 100) / 1000) - 0.05;
  const lonOffset = (((tagHash * 7) % 100) / 1000) - 0.05;

  // Jitter aleatório para simular movimento a cada chamada
  const jitterLat = (Math.random() - 0.5) * 0.002;
  const jitterLon = (Math.random() - 0.5) * 0.002;

  const mockResult: KTagLocationResult = {
    lat: baseLat + latOffset + jitterLat,
    lon: baseLon + lonOffset + jitterLon,
    conf: 92 + Math.floor(Math.random() * 8),
    status: 1,
    timestamp: Date.now(),
    isodatetime: new Date().toISOString(),
    key: tag.hashedAdvKey || 'demo-key'
  };

  return [mockResult];
};

export const exportToCSV = (locations: any[]) => {
  const headers = ['Timestamp', 'Latitude', 'Longitude', 'Conf'];
  const rows = locations.map(l => [l.timestamp, l.lat, l.lon, l.conf].join(','));
  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", `rastreio_demo_${Date.now()}.csv`);
  link.click();
};
