import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

type ButtonProps = {
	children: ReactNode;
	variation?: 'primary' | 'secondary';
	size?: 'small' | 'medium' | 'large';
	onClick?: () => void;
	disabled?: boolean;
	width?: 100;
	iconOnly?: boolean;
	rotateContent?: boolean;
};

function Button(props: ButtonProps) {
	const {
		children,
		size = 'medium',
		variation,
		onClick,
		disabled,
		width,
		iconOnly = false,
		rotateContent,
	} = props;


	const classes = clsx(styles.button, {
		[styles.small]: size === 'small',
		[styles.medium]: size === 'medium',
		[styles.large]: size === 'large',
		[styles.secondary]: variation === 'secondary',
		[styles.fullWidth]: width === 100,
		[styles.iconOnly]: iconOnly,
		[styles.disabled]: disabled,
		[styles.rotateContent]: rotateContent,
	});

	return (
		<button
			className={classes}
			onClick={onClick}
			disabled={disabled}>
			{children}
		</button>
	);
}

export default Button;
