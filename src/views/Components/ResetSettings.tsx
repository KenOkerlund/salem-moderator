import Button from '../../elements/Button';

function ResetSettings(props) {
	const { onReset } = props;
	return (
		<div>
			<h6>RESET SETTINGS</h6>
			<p>Clears and resets all setttings.</p>
			<Button onClick={() => onReset()}>RESET</Button>
		</div>
	);
}

export default ResetSettings;