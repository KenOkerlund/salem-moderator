import clsx from 'clsx';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useSelection } from './use-selection';
import { formatPlayerName } from '../../utils/format-player-name';
import { Footer } from '../shared-components/footer/footer';
import PageBackgroundImage from '../../components/page-background-image/page-background-image';
import Button from '../../components/button/button';
import SettingsButton from '../shared-components/settings-button/settings-button';
import SoundBars from '../../components/sound-bars/sound-bars';

import arrowButton from '../../assets/svg-icons/arrow.svg';
import graveRobberImage from '../../assets/images/grave-robber.png';
import catImage from '../../assets/images/black-cat.png';
import catEyesImage from '../../assets/images/large-cat-eyes.png';

import styles from './selection.module.css';
import { useSalemStore } from '../../stores/salem-store';

export default function Selection() {
	const players = useSalemStore((state) => state.players);
	const phase = useSalemStore((state) => state.phase);
	const setPhase = useSalemStore((state) => state.setPhase);
	const isConstableChecked = useSalemStore((state) => state.isConstableChecked);
	const instructionSpeech = useSalemStore((state) => state.instructionSpeech);
	const setIsConstableChecked = useSalemStore(
		(state) => state.setIsConstableChecked,
	);
	const resetSelectionProcess = useSalemStore(
		(state) => state.resetSelectionProcess,
	);
	const isRevealing = useSalemStore((state) => state.isRevealing);
	const setIsRevealing = useSalemStore((state) => state.setIsRevealing);
	const {
		instructionalText,
		audience,
		setPlayer,
		stage,
		playerToReveal,
		next,
		noVoiceAutoNextTiming,
	} = useSelection();

	const NoVocalCountdown = () => (
		<CountdownCircleTimer
			isPlaying
			duration={noVoiceAutoNextTiming || 0}
			colors={'#f1eccb'}
			trailColor={'#e1ddc024'}
			strokeWidth={4}
			trailStrokeWidth={2}
			size={120}
		>
			{({ remainingTime }) => (
				<span className={styles.remainingTime}>{remainingTime}</span>
			)}
		</CountdownCircleTimer>
	);

	return (
		<>
			{!phase && (
				<div className={styles.phasePage}>
					<PageBackgroundImage image={graveRobberImage} />
					<SettingsButton />
					{phase && <h1>{phase}</h1>}
					<div className={styles.phaseType + ' ' + styles.dawnPhase}>
						<h1 className={styles.header}>Dawn</h1>
						<p className={styles.instructions}>
							The witches select a player to receive the black cat.
						</p>
						<div>
							<Button size="small" onClick={() => setPhase('dawn')}>
								Begin
								<img src={arrowButton} className={styles.arrowIcon} />
							</Button>
						</div>
					</div>

					<div className={styles.line} />

					<div className={styles.phaseType + ' ' + styles.nightPhase}>
						<h1 className={styles.header}>Night</h1>
						<p className={styles.instructions}>
							The witches select a player they wish to kill.
						</p>
						<p className={styles.instructions}>
							The constable selects a player to attempt to save.
						</p>
						<div>
							<Button size="small" onClick={() => setPhase('night')}>
								Begin
								<img src={arrowButton} className={styles.arrowIcon} />
							</Button>
						</div>
						<div className={styles.constable}>
							<input
								type="checkbox"
								id="constable"
								value="constable"
								name="constable"
								checked={isConstableChecked}
								onChange={() => setIsConstableChecked(!isConstableChecked)}
							/>
							<label htmlFor="constable">Constable</label>
						</div>
					</div>
				</div>
			)}
			{phase && (
				<>
					<PageBackgroundImage
						image={phase === 'dawn' ? catImage : catEyesImage}
						fitImage={phase === 'dawn'}
					/>
					<div
						className={`${
							phase === 'dawn' ? styles.dawnBackground : styles.nightBackground
						} ${styles.selectionPage}`}
					>
						<h2 className={styles.phaseTitle}>
							{phase === 'dawn' ? 'Dawn' : 'Night'}
						</h2>
						<div className={styles.audienceAndInstructions}>
							<h4 className={styles.audience}>{audience}</h4>
							<p className={styles.instructions}>{instructionalText}</p>
						</div>
						{stage === 'player-selection' && (
							<div className={styles.playerSelectionContainer}>
								<div
									className={clsx(styles.playerSelectionButtons, {
										[styles.playerSelectionButtonsSingleColumn]:
											players.length === 4,
									})}
								>
									{players.map((player) => {
										return (
											<Button
												// className={styles.playerSelectionButton}
												key={player.id}
												onClick={() => setPlayer(player)}
												size="unset"
												customClassName={styles.playerSelectionButton}
											>
												{formatPlayerName(player)}
											</Button>
										);
									})}
								</div>
							</div>
						)}
						{stage === 'reveal' && (
							<div className={styles.revealingStage}>
								{!isRevealing && (
									<Button
										onClick={() => setIsRevealing(true)}
										size="largest"
										disabled={!!playerToReveal}
										holdDuration={1.5}
									>
										{playerToReveal
											? formatPlayerName(playerToReveal)
											: 'Reveal'}
									</Button>
								)}
								{isRevealing && playerToReveal && (
									<div className={styles.revealingStage}>
										<h4 className={styles.chosenPlayerHeader}>
											Chosen Player:
										</h4>
										<p className={styles.chosenPlayerName}>
											{formatPlayerName(playerToReveal)}
										</p>
									</div>
								)}
							</div>
						)}
						{stage === 'vocal-instruction' && (
							<div className={styles.soundBars}>
								{instructionSpeech && <SoundBars />}
								{!instructionSpeech && <NoVocalCountdown />}
							</div>
						)}
					</div>
					<Footer
						buttons={[
							<Button
								variation="secondary"
								key={'play'}
								onClick={resetSelectionProcess}
							>
								Abort
							</Button>,
							next ? (
								<Button key={'home'} onClick={next}>
									Next
								</Button>
							) : null,
						]}
					/>
				</>
			)}
		</>
	);
}
