import { ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

type ButtonProps = {
	children: ReactNode;
	variation?: 'primary' | 'secondary';
	size?: 'small' | 'medium' | 'large' | 'largest' | 'unset';
	onClick?: () => void;
	holdDuration?: number;
	disabled?: boolean;
	width?: 100;
	height?: 100;
	iconOnly?: boolean;
	rotateContent?: boolean;
	customClassName?: string;
};

function Button(props: ButtonProps) {
	const {
		children,
		size = 'medium',
		variation,
		onClick,
		disabled,
		width,
		height,
		iconOnly = false,
		rotateContent,
		holdDuration,
		customClassName = '',
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
		[styles.fullHeight]: height === 100,
		[styles.iconOnly]: iconOnly,
		[styles.disabled]: disabled,
		[styles.rotateContent]: rotateContent,
		[styles.holdAnimation]: holdDuration && isHeld,
		[customClassName]: !!customClassName,
	});

	const resetHover = () => {
		if (!buttonRef.current) return;
		buttonRef.current.style.backgroundColor = 'transparent';
	};

	useEffect(() => {
		const currentButton = buttonRef.current;

		const handleTouchEnd = () => {
			resetHover();
		};
		const preventContextMenu = (e: MouseEvent) => {
			e.preventDefault();
		};

		currentButton?.addEventListener('touchend', handleTouchEnd, {
			passive: true,
		});

		currentButton?.addEventListener('contextmenu', preventContextMenu);

		return () => {
			currentButton?.removeEventListener('touchend', handleTouchEnd);
			currentButton?.removeEventListener('contextmenu', preventContextMenu);
		};
	}, []);

	const startHold = () => {
		!disabled && setIsHeld(true);
		holdDuration &&
			(holdTimeoutRef.current = window.setTimeout(() => {
				onClick && onClick();
			}, holdDuration * 1000));
	};

	const endHold = () => {
		setIsHeld(false);
		holdTimeoutRef.current && clearTimeout(holdTimeoutRef.current);
	};

	return (
		<button
			ref={buttonRef}
			style={{
				animationDuration: holdDuration ? `${holdDuration}s` : undefined,
			}}
			onMouseDown={startHold}
			onMouseUp={endHold}
			onMouseLeave={endHold}
			onDragLeave={endHold}
			onTouchStart={startHold}
			onTouchEnd={endHold}
			className={classes}
			onClick={!holdDuration ? onClick : undefined}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default Button;
