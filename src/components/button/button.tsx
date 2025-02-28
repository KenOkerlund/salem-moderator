import { ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

type ButtonProps = {
	children: ReactNode;
	variation?: 'primary' | 'secondary';
	size?: 'small' | 'medium' | 'large' | 'largest';
	onClick?: () => void;
	holdDuration?: number;
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
		holdDuration,
	} = props;

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const [isHeld, setIsHeld] = useState(false);
	const holdTimeoutRef = useRef<number | null>(null);

	const classes = clsx(styles.button, {
		[styles.small]: size === 'small',
		[styles.medium]: size === 'medium',
		[styles.large]: size === 'large',
		[styles.largest]: size === 'largest',
		[styles.secondary]: variation === 'secondary',
		[styles.fullWidth]: width === 100,
		[styles.iconOnly]: iconOnly,
		[styles.disabled]: disabled,
		[styles.rotateContent]: rotateContent,
		[styles.holdAnimation]: holdDuration && isHeld,
	});

	const handleMouseDown = () => {
		!disabled && setIsHeld(true);
		holdDuration &&
			(holdTimeoutRef.current = window.setTimeout(() => {
				onClick && onClick();
			}, holdDuration * 1000));
	};

	const handleMouseUp = () => {
		setIsHeld(false);
		holdTimeoutRef.current && clearTimeout(holdTimeoutRef.current);
	};

	useEffect(() => {
		const currentRef = buttonRef.current;
		const preventContextMenu = (e: MouseEvent) => {
			e.preventDefault();
		};

		currentRef?.addEventListener('contextmenu', preventContextMenu);

		return () => {
			currentRef?.removeEventListener('contextmenu', preventContextMenu);
		};
	}, [buttonRef]);

	return (
		<button
			ref={buttonRef}
			style={{
				animationDuration: holdDuration ? `${holdDuration}s` : undefined,
			}}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onDragLeave={handleMouseUp}
			onTouchStart={handleMouseDown}
			onTouchMove={handleMouseUp}
			onTouchEnd={handleMouseUp}
			className={classes}
			onClick={!holdDuration ? onClick : undefined}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default Button;
