import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, Routes } from 'react-router-dom';
import Clients from './pages/Clients';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Clients />} />
					<Route path='/Clients' element={<Clients />} />
				</Routes>
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
