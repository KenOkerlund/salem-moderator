export function Random({ onClick }: { onClick: () => void }) {
	return (
		<button data-testId="button" onClick={onClick}>
			This is random component
		</button>
	);
}
