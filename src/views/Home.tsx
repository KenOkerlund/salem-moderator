import highlightedPerson from "../assets/images/highlighted-person.png";
import ModeratorLogo from '../assets/images/moderator-logo.svg';
import Button from "../elements/Button";

function Home() {
    return (
        <div className='home'>
            <img src={ModeratorLogo} alt="Salem Moderator logo" className='logo' />
            <img src={highlightedPerson} alt="Lady" className='salem-lady' />
            <Button text="BEGIN" className="border button-spacing-large"/>
            <Button text="SYNC DEVICE" className="button-text-small" />
        </div>
    )
}

export default Home;