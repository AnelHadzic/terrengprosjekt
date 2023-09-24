import BedriftContext from "@/app/contexts/BedriftContext";
import { useContext } from "react";
import DomeneComponent from "./DomeneComponent";
import PrivateListComponent from "./PrivateListComponent";

const PrivatAvtale = () => {
    const { privateAgreementType, privateAgreement } =
        useContext(BedriftContext);

    return (
        <>
            {privateAgreement ? (
                <>
                    {privateAgreementType === "List" && (
                        <PrivateListComponent header="Fyll inn detaljer om den private avtalen" />
                    )}
                    {privateAgreementType === "Domain" && <DomeneComponent header="Privatavtale detaljer"/>}
                </>
            ) : (
                <p>
                    {" "}
                    Ingen privatavtale er valgt. Du kan gå videre til neste steg
                </p>
            )}
        </>
    );
};

export default PrivatAvtale;
