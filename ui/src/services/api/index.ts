import apClient from './apiClient';

export const getClients = (): Promise<Client[]> => {
	return apClient.get<Client[]>('clients');
};

export const createClient = (client: Client): Promise<void> => {
	return apClient.post<void>('clients', client);
};

export const updateClient = (client: Client): Promise<void> => {
	return apClient.put<void>('clients', client);
};
