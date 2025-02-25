import clsx from 'clsx';
import Button from '../../../components/button/button';
import styles from './footer.module.css';

type FooterProps = {
	autoLeft?: boolean;
	onPrimaryClick?: () => void;
	primaryButtonText?: string | null;
	onSecondaryClick?: () => void;
	secondaryButtonText?: string | null;
};

export function Footer(props: FooterProps) {
	const {
		autoLeft,
		onPrimaryClick,
		primaryButtonText,
		onSecondaryClick,
		secondaryButtonText,
	} = props;

	const classes = clsx(styles.footer, {
		[styles.autoLeft]: autoLeft,
	});

	return (
		<footer className={classes}>
			{primaryButtonText && (
				<Button disabled={!onPrimaryClick} onClick={onPrimaryClick}>
					{primaryButtonText}
				</Button>
			)}
			{secondaryButtonText && (
				<Button
					disabled={!onSecondaryClick}
					onClick={onSecondaryClick}
					variation="secondary"
				>
					{secondaryButtonText}
				</Button>
			)}
		</footer>
	);
}
