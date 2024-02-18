import { ReactNode } from 'react';
import clsx from 'clsx';
import './Button.css';

type ButtonProps = {
    children: ReactNode;
    variation?: 'primary' | 'secondary';
    size?: 'large' | 'small' | 'mini';
    custom?: boolean;
    onClick?: () => void;
    disabled?: boolean;
};

function Button({ children, size, variation, custom, onClick, disabled }: ButtonProps) {
	let classes = '';
	if (!custom) {
		classes = clsx('button', {
			'button--large': size === 'large',
			'button--small': size === 'small',
			'button--mini': size === 'mini',
			'button--borderless': variation === 'secondary',
		});
	}
	return (
		<button className={classes} onClick={onClick} disabled={disabled}>{children}</button>
	);
}

export default Button;
