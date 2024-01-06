import { ReactNode } from 'react'
import clsx from 'clsx';
import './Button.css';

type ButtonProps = {
    children: ReactNode;
    variation?: 'primary' | 'secondary';
    size?: 'large' | 'small';
    custom?: boolean;
};

function Button({ children, size, variation, custom }: ButtonProps) {
    let classes = "";
    if (!custom) {
        classes = clsx('button', {
            'button--large': size === 'large',
            'button--small': size === 'small',
            'button--borderless': variation === "secondary",
        })
    }
    return (
        <button className={classes}>{children}</button>
    )
}

export default Button;