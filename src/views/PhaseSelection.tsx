import SettingsButton from '../elements/SettingsButton';
import dawnTile from '../assets/images/dawn-tile.png';
import nightTile from '../assets/images/night-tile.png';

function PhaseSelection(){
	return (
		<>
			<SettingsButton />
			<div className="phase-selection">
				<div className='phase-card dawn-card'>
					<div>
						<h6>DAWN</h6>
						<p>The witches select a player to receive the black cat.</p>
					</div>
					<img src={dawnTile} alt="Picture of a black cat" />
				</div>
				<div className='night-and-constable-card'>
					<div className='phase-card night-card'>
						<div>
							<h6>NIGHT</h6>
							<div className='night-card-content'>
								<p>The witches select a player they wish to kill.</p>
								<p>The constable selects a player to attempt to save.</p>
							</div>
						</div>
						<img src={nightTile} alt="Picture of a black cats eyes" />
					</div>
					<div className='night-phase-constable'>
						<input type="checkbox" name="constable" id="constable" />
						<label htmlFor="constable">CONSTABLE</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default PhaseSelection;
