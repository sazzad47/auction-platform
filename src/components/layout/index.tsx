import React, { ReactNode } from 'react';
import Header from './header';

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Layout;
