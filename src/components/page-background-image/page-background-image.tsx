import clsx from 'clsx';
import styles from './page-background-image.module.css';

type PageBackgroundImageProps = {
	image: string;
	shrink?: boolean;
	fitImage?: boolean;
};

export default function PageBackgroundImage(props: PageBackgroundImageProps) {
	const { image, shrink, fitImage } = props;

	const imageClasses = clsx({
		[styles.shrinkImage]: shrink,
		[styles.fitImage]: fitImage,
	});

	return (
		<div className={styles.container}>
			<img className={imageClasses} src={image} alt="testing cat eyes" />
		</div>
	);
}
