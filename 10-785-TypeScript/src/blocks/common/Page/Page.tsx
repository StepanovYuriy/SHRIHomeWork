import React from 'react';
import './Page.scss';

export interface PageProps {
    children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => (
    <div className="Page">
        {children}
    </div>
);

export default Page;
