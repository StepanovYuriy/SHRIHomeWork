import React from 'react';
import './Button.scss';
import cn from 'classnames';
import { ReactComponent as IconSettings } from '../../../images/settings_12.svg';
import { ReactComponent as IconRun } from '../../../images/play_12.svg';
import { ReactComponent as IconRebuild } from '../../../images/rebuild_12.svg';

export enum Size {
    s = 's',
    m = 'm',
}

export enum Type {
    default = 'default',
    action = 'action',
}

export enum Icon {
    settings = 'settings',
    run = 'run',
    rebuild = 'rebuild',
}

export interface ButtonProps {
    size: Size;
    type: Type;
    icon?: Icon;
    text?: string;
    disabled?: boolean;
    mixedClassNames?: string;

    onClick(): void;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        size,
        type,
        icon = null,
        text = '',
        disabled = false,
        mixedClassNames = '',
        onClick,
    } = props;

    const renderIcon = (): React.ReactElement | null => {
        switch (icon) {
            case 'settings':
                return <IconSettings className="Button-Icon" />;

            case 'run':
                return <IconRun className="Button-Icon" />;

            case 'rebuild':
                return <IconRebuild className="Button-Icon" />;

            default:
                return null;
        }
    };

    const renderText = (): React.ReactElement => (
        <div className="Button-Text">
            {text}
        </div>
    );

    return (
        <button type="button"
                className={cn(
                    'Button', {
                        [`Button_size_${size}`]: Object.values(Size).includes(size),
                        [`Button_type_${type}`]: Object.values(Type).includes(type) && !disabled,
                        // eslint-disable-next-line no-useless-computed-key
                        ['Button_disabled']: disabled,
                    },
                    mixedClassNames,
                )}
                onClick={onClick}
                disabled={disabled}
        >
            {icon ? renderIcon() : null}
            {text !== '' ? renderText() : null}
        </button>
    );
};

export default Button;
