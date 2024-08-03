import { render, fireEvent } from '@testing-library/react';
import { Random } from './example-react';

describe('<Random /> component', () => {
	test('should render the text in the button', () => {
		// Arrange
		const onClick = vi.fn(); // create a function that can be asserted on
		const { getByRole } = render(<Random onClick={onClick} />);
		const button = getByRole('button');

		// Act
		fireEvent.click(button); // simulate a user clicking on the button

		// Assert
		expect(onClick).toHaveBeenCalled();
	});
});
