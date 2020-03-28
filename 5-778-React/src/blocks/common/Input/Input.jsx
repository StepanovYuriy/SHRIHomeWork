import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';
import cn from 'classnames';

const Input = (props) => {
    const {
        value,
        label,
        placeholder,
        required,
        textRight,
        mixedClassNames,
    } = props;

    const renderLabel = () => (
        <label className="Input-Label">
            {label}
            {required ? <span className="Input-LabelRequired"> *</span> : null}
        </label>
    );

    return (
        <div className={cn('Input', mixedClassNames)}>
            {label !== '' ? renderLabel() : null}
            <input className={cn('Input-Box', { 'Input-Box_text_right': Boolean(textRight) })}
                   value={value}
                   placeholder={placeholder}
            />
        </div>
    );
};

Input.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    textRight: PropTypes.bool,
    mixedClassNames: PropTypes.string,
};

Input.defaultProps = {
    value: '',
    label: '',
    placeholder: '',
    required: false,
    textRight: false,
    mixedClassNames: null,
};

export default Input;
