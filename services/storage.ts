
import { Tag, Vehicle, User, LocationHistory, AppSettings, Company, VehicleCategory, StolenRecord, Client, AuditLog, AppNotification } from '../types';

const KEYS = {
  USER_SESSION: 'ktag_user_session',
  USERS_DB: 'ktag_users_db',
  TAGS: 'ktag_tags',
  VEHICLES: 'ktag_vehicles',
  CLIENTS: 'ktag_clients',
  LOCATIONS: 'ktag_locations',
  THEME: 'ktag_theme',
  SETTINGS: 'ktag_settings_demo',
  COMPANIES: 'ktag_companies',
  CATEGORIES: 'ktag_categories',
  STOLEN_RECORDS: 'ktag_stolen_records',
  AUDIT_LOGS: 'ktag_audit_logs',
  NOTIFICATIONS: 'ktag_notifications',
};

const getLocal = <T>(key: string, def: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : def;
  } catch (e) {
    return def;
  }
};

const setLocal = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
};

const DEFAULT_CATEGORIES: VehicleCategory[] = [
  { id: 'cat-car', name: 'Carro de Passeio', fipeType: 'carros' },
  { id: 'cat-truck', name: 'Caminhão', fipeType: 'caminhoes' },
  { id: 'cat-moto', name: 'Motocicleta', fipeType: 'motos' },
];

// MOCK DATA SEED
const seedDemoData = () => {
  if (localStorage.getItem(KEYS.VEHICLES)) return; // Já populado

  const companies: Company[] = [
    { id: 'comp-1', name: 'Matriz Natal', prefix: 'MTZ' },
    { id: 'comp-2', name: 'Filial Mossoró', prefix: 'MSR' }
  ];

  const clients: Client[] = [
    { id: 'cli-1', name: 'REGINALDO DOS SANTOS LIMA', cpf: '862.673.372-00', phone: '(84) 98822-1100', email: 'reginaldo@email.com', hasAccess: true, createdAt: Date.now() },
    { id: 'cli-2', name: 'JANDERSON DANIEL DANTAS', cpf: '712.987.634-44', phone: '(84) 99122-3344', email: 'janderson@email.com', hasAccess: true, createdAt: Date.now() },
    { id: 'cli-3', name: 'MARCELO MARTINS DE LIMA', cpf: '011.875.244-90', phone: '(84) 98700-5566', email: 'marcelo@email.com', hasAccess: true, createdAt: Date.now() },
    { id: 'cli-4', name: 'WALDEMAR VAGNER DANTAS DA SILVA', cpf: '712.618.544-89', phone: '(84) 99444-1122', email: 'vagner@email.com', hasAccess: true, createdAt: Date.now() },
    { id: 'cli-5', name: 'ANDRE CASSIMIRO PEREIRA DE MELO', cpf: '053.966.644-81', phone: '(84) 98111-2233', email: 'andre@email.com', hasAccess: true, createdAt: Date.now() }
  ];

  const tags: Tag[] = [
    { id: 'tag-1', name: 'K-TAG 01', accessoryId: 'KT-9901A', hashedAdvKey: 'h1', privateKey: 'p1', createdAt: Date.now() },
    { id: 'tag-2', name: 'K-TAG 02', accessoryId: 'KT-9902B', hashedAdvKey: 'h2', privateKey: 'p2', createdAt: Date.now() },
    { id: 'tag-3', name: 'K-TAG 03', accessoryId: 'KT-9903C', hashedAdvKey: 'h3', privateKey: 'p3', createdAt: Date.now() },
    { id: 'tag-4', name: 'K-TAG 04', accessoryId: 'KT-9904D', hashedAdvKey: 'h4', privateKey: 'p4', createdAt: Date.now() },
    { id: 'tag-5', name: 'K-TAG 05', accessoryId: 'KT-9905E', hashedAdvKey: 'h5', privateKey: 'p5', createdAt: Date.now() },
    { id: 'tag-6', name: 'K-TAG 06', accessoryId: 'KT-9906F', hashedAdvKey: 'h6', privateKey: 'p6', createdAt: Date.now() },
    { id: 'tag-7', name: 'K-TAG 07', accessoryId: 'KT-9907G', hashedAdvKey: 'h7', privateKey: 'p7', createdAt: Date.now() },
    { id: 'tag-8', name: 'K-TAG 08', accessoryId: 'KT-9908H', hashedAdvKey: 'h8', privateKey: 'p8', createdAt: Date.now() }
  ];

  const vehicles: Vehicle[] = [
    { id: 'v1', plate: 'PFS1C06', model: 'FIAT PALIO 1.0 ECONOMY FIRE FLEX 8V 2P', type: 'cat-car', tagId: 'tag-1', clientId: 'cli-1', companyId: 'comp-1', status: 'active', createdAt: Date.now(), updatedBy: 'SISTEMA' },
    { id: 'v2', plate: 'NOD8G64', model: 'VW - VOLKSWAGEN GOL (NOVO) 1.6 MI TOTAL FLEX 8V 4P', type: 'cat-car', tagId: 'tag-2', clientId: 'cli-2', companyId: 'comp-1', status: 'active', createdAt: Date.now(), updatedBy: 'SISTEMA' },
    { id: 'v3', plate: 'QGR9288', model: 'VW - VOLKSWAGEN VOYAGE 1.0 FLEX 12V 4P', type: 'cat-car', tagId: 'tag-3', clientId: 'cli-3', companyId: 'comp-1', status: 'active', createdAt: Date.now(), updatedBy: 'SISTEMA' },
    { id: 'v4', plate: 'NOG4F01', model: 'FIAT UNO VIVACE 1.0 EVO FIRE FLEX 8V 3P', type: 'cat-car', tagId: 'tag-4', clientId: 'cli-4', companyId: 'comp-1', status: 'active', createdAt: Date.now(), updatedBy: 'SISTEMA' },
    { id: 'v5', plate: 'OWE1759', model: 'FIAT UNO MILLE WAY ECONOMY 1.0 F.FLEX 4P', type: 'cat-car', tagId: 'tag-5', clientId: 'cli-5', companyId: 'comp-2', status: 'active', createdAt: Date.now(), updatedBy: 'SISTEMA' },
    { id: 'v6', plate: 'OJT8G14', model: 'GM - CHEVROLET PRISMA SED. LT 1.4 8V FLEXPOWER 4P', type: 'cat-car', tagId: 'tag-6', clientId: 'cli-1', companyId: 'comp-2', status: 'maintenance', createdAt: Date.now(), updatedBy: 'SISTEMA' },
    { id: 'v7', plate: 'KJF8117', model: 'FIAT PALIO ELX 1.3 MPI FLEX 8V 4P', type: 'cat-car', tagId: 'tag-7', clientId: 'cli-2', companyId: 'comp-1', status: 'active', createdAt: Date.now(), updatedBy: 'SISTEMA' },
    { id: 'v8', plate: 'QRE9J22', model: 'TOYOTA COROLLA XEI 2.0', type: 'cat-car', tagId: 'tag-8', clientId: 'cli-3', companyId: 'comp-1', status: 'stolen', createdAt: Date.now(), updatedBy: 'SISTEMA' }
  ];

  setLocal(KEYS.COMPANIES, companies);
  setLocal(KEYS.CLIENTS, clients);
  setLocal(KEYS.TAGS, tags);
  setLocal(KEYS.VEHICLES, vehicles);
  setLocal(KEYS.CATEGORIES, DEFAULT_CATEGORIES);
};

seedDemoData();

export const storage = {
  getNotifications: (): AppNotification[] => getLocal<AppNotification[]>(KEYS.NOTIFICATIONS, []),
  saveNotifications: (notifications: AppNotification[]) => setLocal(KEYS.NOTIFICATIONS, notifications),

  logAction: async (user: User | null, action: AuditLog['action'], entity: string, details: string, entityId?: string) => {
    if (!user) return;
    const logEntry: AuditLog = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action,
      entity,
      entityId,
      details,
      timestamp: Date.now()
    };
    const logs = getLocal<AuditLog[]>(KEYS.AUDIT_LOGS, []);
    logs.unshift(logEntry);
    setLocal(KEYS.AUDIT_LOGS, logs.slice(0, 100));
  },

  getAuditLogs: async (limitCount = 100): Promise<AuditLog[]> => getLocal<AuditLog[]>(KEYS.AUDIT_LOGS, []),

  getSessionUser: async (): Promise<User | null> => getLocal<User | null>(KEYS.USER_SESSION, null),
  setSessionUser: async (user: User) => setLocal(KEYS.USER_SESSION, user),
  clearSessionUser: async () => localStorage.removeItem(KEYS.USER_SESSION),

  findUserByEmail: async (email: string): Promise<User | null> => {
    const localUsers = getLocal<User[]>(KEYS.USERS_DB, []);
    return localUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  registerUserRequest: async (user: User) => {
    const users = getLocal<User[]>(KEYS.USERS_DB, []);
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) users[idx] = user; else users.push(user);
    setLocal(KEYS.USERS_DB, users);
  },

  getAllUsers: async (): Promise<User[]> => getLocal<User[]>(KEYS.USERS_DB, []),
  
  updateUserStatus: async (userId: string, status: any) => {
    const users = getLocal<User[]>(KEYS.USERS_DB, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx >= 0) { users[idx].status = status; setLocal(KEYS.USERS_DB, users); }
  },

  updateUserProfile: async (userId: string, data: Partial<User>) => {
    const users = getLocal<User[]>(KEYS.USERS_DB, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx >= 0) { users[idx] = { ...users[idx], ...data }; setLocal(KEYS.USERS_DB, users); }
    const session = await storage.getSessionUser();
    if (session && session.id === userId) setLocal(KEYS.USER_SESSION, { ...session, ...data });
  },

  getCompanies: async (): Promise<Company[]> => getLocal<Company[]>(KEYS.COMPANIES, []),
  saveCompany: async (company: Company) => {
    const list = getLocal<Company[]>(KEYS.COMPANIES, []);
    const idx = list.findIndex(c => c.id === company.id);
    if (idx >= 0) list[idx] = company; else list.push(company);
    setLocal(KEYS.COMPANIES, list);
  },
  deleteCompany: async (id: string) => setLocal(KEYS.COMPANIES, getLocal<Company[]>(KEYS.COMPANIES, []).filter(c => c.id !== id)),

  getCategories: async (): Promise<VehicleCategory[]> => {
    const data = getLocal<VehicleCategory[]>(KEYS.CATEGORIES, []);
    return data.length ? data : DEFAULT_CATEGORIES;
  },
  saveCategory: async (category: VehicleCategory) => {
    const list = getLocal<VehicleCategory[]>(KEYS.CATEGORIES, []);
    const idx = list.findIndex(c => c.id === category.id);
    if (idx >= 0) list[idx] = category; else list.push(category);
    setLocal(KEYS.CATEGORIES, list);
  },
  deleteCategory: async (id: string) => setLocal(KEYS.CATEGORIES, getLocal<VehicleCategory[]>(KEYS.CATEGORIES, []).filter(c => c.id !== id)),

  getClients: async (): Promise<Client[]> => getLocal<Client[]>(KEYS.CLIENTS, []),
  saveClient: async (client: Client) => {
    const list = getLocal<Client[]>(KEYS.CLIENTS, []);
    const idx = list.findIndex(c => c.id === client.id);
    if (idx >= 0) list[idx] = client; else list.push(client);
    setLocal(KEYS.CLIENTS, list);
  },
  deleteClient: async (id: string) => setLocal(KEYS.CLIENTS, getLocal<Client[]>(KEYS.CLIENTS, []).filter(c => c.id !== id)),

  getTags: async (): Promise<Tag[]> => getLocal<Tag[]>(KEYS.TAGS, []),
  saveTag: async (tag: Tag) => {
    const list = getLocal<Tag[]>(KEYS.TAGS, []);
    const idx = list.findIndex(t => t.id === tag.id);
    if (idx >= 0) list[idx] = tag; else list.push(tag);
    setLocal(KEYS.TAGS, list);
  },
  deleteTag: async (id: string) => setLocal(KEYS.TAGS, getLocal<Tag[]>(KEYS.TAGS, []).filter(t => t.id !== id)),
  deleteTags: async (ids: string[]) => setLocal(KEYS.TAGS, getLocal<Tag[]>(KEYS.TAGS, []).filter(t => !ids.includes(t.id))),

  getVehicles: async (): Promise<Vehicle[]> => getLocal<Vehicle[]>(KEYS.VEHICLES, []),
  saveVehicle: async (vehicle: Vehicle) => {
    const list = getLocal<Vehicle[]>(KEYS.VEHICLES, []);
    const idx = list.findIndex(v => v.id === vehicle.id);
    if (idx >= 0) list[idx] = vehicle; else list.push(vehicle);
    setLocal(KEYS.VEHICLES, list);
  },
  deleteVehicle: async (id: string) => setLocal(KEYS.VEHICLES, getLocal<Vehicle[]>(KEYS.VEHICLES, []).filter(v => v.id !== id)),

  getLocations: async (tagId: string): Promise<LocationHistory[]> => {
    const all = getLocal<LocationHistory[]>(KEYS.LOCATIONS, []);
    return all.filter(l => l.tagId === tagId).sort((a, b) => b.timestamp - a.timestamp);
  },
  addLocation: async (loc: LocationHistory) => {
    const all = getLocal<LocationHistory[]>(KEYS.LOCATIONS, []);
    all.push(loc);
    setLocal(KEYS.LOCATIONS, all.slice(-5000));
  },

  getStolenRecords: async (): Promise<StolenRecord[]> => getLocal<StolenRecord[]>(KEYS.STOLEN_RECORDS, []),
  reportTheft: async (record: StolenRecord) => {
    const list = getLocal<StolenRecord[]>(KEYS.STOLEN_RECORDS, []);
    list.unshift(record);
    setLocal(KEYS.STOLEN_RECORDS, list);
    const v = (await storage.getVehicles()).find(v => v.id === record.vehicleId);
    if (v) await storage.saveVehicle({ ...v, status: 'stolen' });
  },
  recoverVehicle: async (recordId: string, vehicleId: string) => {
    const list = getLocal<StolenRecord[]>(KEYS.STOLEN_RECORDS, []);
    const idx = list.findIndex(r => r.id === recordId);
    if (idx >= 0) { list[idx].status = 'recovered'; list[idx].recoveredAt = Date.now(); setLocal(KEYS.STOLEN_RECORDS, list); }
    const v = (await storage.getVehicles()).find(v => v.id === vehicleId);
    if (v) await storage.saveVehicle({ ...v, status: 'active' });
  },

  getSettings: async (): Promise<AppSettings> => getLocal<AppSettings>(KEYS.SETTINGS, { language: 'pt' } as any),
  saveSettings: async (settings: AppSettings) => setLocal(KEYS.SETTINGS, settings),
  getTheme: (): 'light' | 'dark' => getLocal<'light' | 'dark'>(KEYS.THEME, 'dark'),
  setTheme: (theme: 'light' | 'dark') => setLocal(KEYS.THEME, theme),
};
