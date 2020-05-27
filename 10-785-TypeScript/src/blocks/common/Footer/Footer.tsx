import React from 'react';
import './Footer.scss';
import { useTranslation } from 'react-i18next';
import Link from '../Link/Link';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="Footer">
            <div className="Footer-Navigation">
                <Link name={t('support')}
                      href="#"
                      mixedClassNames="Footer-Link_space_right"
                />
                <Link name={t('learning')}
                      href="#"
                      mixedClassNames="Footer-Link_space_right"
                />
                <LanguageSwitcher />
            </div>
            <div className="Footer-Copyright">
                {`© 2020 ${t('author')}`}
            </div>
        </div>
    );
};

export default Footer;
