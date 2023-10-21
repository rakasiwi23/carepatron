import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}
export default function Page({ children }: Props) {
	return <div style={{ margin: 'auto', marginTop: 24, maxWidth: '700px' }}>{children}</div>;
}
