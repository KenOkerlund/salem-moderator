import { ReactNode } from 'react';
import { Footer } from './footer/footer';
import styles from './phase.module.css';

type phaseProps = {
	phaseType: 'Dawn' | 'Night';
	children: ReactNode;
	secondaryButton?: boolean;
	secondaryButtonClick?: () => void;
}

export function Phase(props: phaseProps) {
	function abortButtonClick() {

	}


	return (<>
		<div className={styles.phasePage}>
			<h1 className={styles.phaseType}>{props.phaseType}</h1>
			<div className={styles.content}>
				<div>{props.children}</div>
			</div>
		</div>
		<Footer primaryButtonText='Abort' onPrimaryClick={abortButtonClick} secondaryButtonText={props.secondaryButton ? 'Next' : undefined} onSecondaryClick={props.secondaryButtonClick} />
	</>
	);
}
