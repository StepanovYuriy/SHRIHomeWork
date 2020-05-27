import React from 'react';
import './LanguageSwitcher.scss';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { t, i18n } = useTranslation();

    const getCurrentLng = (): string => i18n.language || window.localStorage.i18nextLng || '';

    const changeLanguage = (): void => {
        const lng = getCurrentLng() !== 'en' ? 'en' : 'ru';

        i18n.changeLanguage(lng);
    };

    return (
        <button type="button"
                className="LanguageSwitcher"
                onClick={changeLanguage}
        >
            {t('languageVersion')}
        </button>
    );
};

export default LanguageSwitcher;
