import { ReactNode } from "react";
import { Footer } from "./footer/footer";

type phaseProps = {
    phaseType: 'Dawn' | 'Night';
    children: ReactNode;
    secondaryButton?: boolean;
}

export function Phase(props: phaseProps) {
    function abortButtonClick() {

    }

    function nextButtonClick() {

    }

    return (
        <>
            <div>
                <h1>{props.phaseType}</h1>
                <div>{props.children}</div>
            </div>
            <Footer primaryButtonText='Abort' onPrimaryClick={abortButtonClick} secondaryButtonText={props.secondaryButton ? 'Next' : undefined } onSecondaryClick={nextButtonClick} />
        </>
    )
}