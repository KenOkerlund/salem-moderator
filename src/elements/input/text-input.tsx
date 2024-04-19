import styles from './text-input.module.css';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput(props: TextInputProps) {
	return (
		<input
			type='text'
			className={styles.input}
			{...props}
		/>
	);
}
