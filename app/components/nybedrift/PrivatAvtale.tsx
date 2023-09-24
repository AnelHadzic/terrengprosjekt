import BedriftContext from "@/app/contexts/BedriftContext";
import { useContext } from "react";
import ListAgreementDetails from "./ListComponent";

const PrivatAvtale = () => {
    const { privateAgreementType } =
    useContext(BedriftContext);

  return (
    <>
    {(privateAgreementType === "List")&&<ListAgreementDetails header="Fyll inn detaljer om den private avtalen" />}
    </>
  );
}

export default PrivatAvtale;
