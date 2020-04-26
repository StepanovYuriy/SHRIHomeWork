import React from 'react';
import './Header.scss';
import cn from 'classnames';

export enum TitleType {
    settings = 'settings',
    build = 'build',
}

export interface HeaderProps {
    title?: string;
    titleType?: TitleType;
    children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
    const {
        title = '',
        titleType = TitleType.settings,
        children,
    } = props;

    return (
        <div className="Header">
            <div className={cn(
                'Header-Title', {
                    [`Header-Title_type_${titleType}`]: titleType && Object.values(TitleType).includes(titleType),
                },
            )}
            >
                {title}
            </div>
            {children}
        </div>
    );
};

export default Header;
