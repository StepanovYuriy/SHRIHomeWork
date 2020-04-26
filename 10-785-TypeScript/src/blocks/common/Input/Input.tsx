import React from 'react';
import './Input.scss';
import cn from 'classnames';

export interface InputProps {
    value: string | number;
    label?: string;
    placeholder?: string;
    required?: boolean;
    textRight?: boolean;
    mixedClassNames?: string;

    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Input: React.FC<InputProps> = (props) => {
    const {
        value,
        label = '',
        placeholder = '',
        required = false,
        textRight = false,
        mixedClassNames = '',
        onChange,
    } = props;

    const renderLabel = (): React.ReactElement => (
        <label className="Input-Label">
            {label}
            {required ? <span className="Input-LabelRequired"> *</span> : null}
        </label>
    );

    return (
        <div className={cn('Input', mixedClassNames)}>
            {label !== '' ? renderLabel() : null}
            <input className={cn('Input-Box', { 'Input-Box_text_right': textRight })}
                   value={value}
                   onChange={onChange}
                   placeholder={placeholder}
            />
        </div>
    );
};

export default Input;
