import styles from './sound-bars.module.css';

const SoundBars = () => {
	// Array to represent the 4 bars and their animation delays
	const bars = [
		{ id: 1, delay: '0s' },
		{ id: 2, delay: '0.2s' },
		{ id: 3, delay: '0.4s' },
		{ id: 4, delay: '0.6s' },
	];

	return (
		<div className={styles.soundBarsContainer}>
			{bars.map((bar) => (
				<div
					key={bar.id}
					className={styles.soundBar}
					style={{ animationDelay: bar.delay }}
				></div>
			))}
		</div>
	);
};

export default SoundBars;
