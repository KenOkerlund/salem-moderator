import { ReactElement } from 'react';
import clsx from 'clsx';
import Button from '../../../components/button/button';
import styles from './footer.module.css';

type FooterProps = {
	autoLeft?: boolean;
	onPrimaryClick?: () => void;
	primaryButtonText?: string | null;
	onSecondaryClick?: () => void;
	secondaryButtonText?: string | null;
	buttons?: (ReactElement<typeof Button> | null)[];
};

export function Footer(props: FooterProps) {
	const {
		autoLeft,
		onPrimaryClick,
		primaryButtonText,
		onSecondaryClick,
		secondaryButtonText,
		buttons = [],
	} = props;

	const classes = clsx(styles.footer, {
		[styles.autoLeft]: autoLeft,
	});

	return (
		<footer className={classes}>
			{buttons.length > 0 ? (
				buttons
			) : (
				<>
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
				</>
			)}
		</footer>
	);
}
