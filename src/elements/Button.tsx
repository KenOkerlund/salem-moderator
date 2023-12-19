import './Button.css';
import clsx from 'clsx';

type ButtonProps = {
    text: string;
    className?: string | string[] | { [key: string]: boolean };
}

function Button({ text, className }: ButtonProps) {
    return (
        <button className={clsx(className)}>{text}</button>
    )
}

export default Button;