import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';
import cn from 'classnames';
import { ReactComponent as IconSettings } from '../../../images/settings_12.svg';
import { ReactComponent as IconRun } from '../../../images/play_12.svg';
import { ReactComponent as IconRebuild } from '../../../images/rebuild_12.svg';

const SIZES = ['s', 'm'];
const TYPES = ['default', 'action'];
const ICONS = ['settings', 'run', 'rebuild'];

const Button = (props) => {
    const { size, type, icon, text, disabled, mixedClassNames } = props;

    const renderIcon = () => {
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

    const renderText = () => (
        <div className="Button-Text">
            {text}
        </div>
    );

    return (
        <button type="button"
                className={cn(
                    'Button', {
                        [`Button_size_${size}`]: SIZES.includes(size),
                        [`Button_type_${type}`]: TYPES.includes(type) && !disabled,
                        Button_disabled: Boolean(disabled),
                    },
                    mixedClassNames,
                )}
                disabled={disabled ? true : null}
        >
            {icon ? renderIcon() : null}
            {text !== '' ? renderText() : null}
        </button>
    );
};

Button.propTypes = {
    size: PropTypes.oneOf(SIZES).isRequired,
    type: PropTypes.oneOf(TYPES).isRequired,
    icon: PropTypes.oneOf(ICONS),
    text: PropTypes.string,
    disabled: PropTypes.bool,
    mixedClassNames: PropTypes.string,
};

Button.defaultProps = {
    icon: null,
    text: '',
    disabled: false,
    mixedClassNames: null,
};

export default Button;
