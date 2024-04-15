import clsx from 'clsx';
import Button from '../../../elements/Button';
import styles from './footer.module.css';

type FooterProps = {
	autoLeft?: boolean;
	onPrimaryClick?: () => void;
	primaryButtonText?: string;
	onSecondaryClick?: () => void;
	secondaryButtonText?: string;
};

export function Footer(props: FooterProps) {
	const {
		autoLeft,
		onPrimaryClick,
		primaryButtonText,
		onSecondaryClick,
		secondaryButtonText,
	} = props;

	const showPrimaryButton = onPrimaryClick && primaryButtonText;
	const showSecondaryButton = onSecondaryClick && secondaryButtonText;

	const classes = clsx(styles.footer, {
		[styles.autoLeft]: autoLeft,
	});

	return (
		<footer className={classes}>
			{showPrimaryButton && (
				<Button onClick={onPrimaryClick}>{primaryButtonText}</Button>
			)}
			{showSecondaryButton && (
				<Button variation='secondary' onClick={onSecondaryClick}>
					{secondaryButtonText}
				</Button>
			)}
		</footer>
	);
}
