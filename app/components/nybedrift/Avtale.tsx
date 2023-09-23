import React, { useContext, useState } from "react";
import BedriftContext from "@/app/contexts/BedriftContext";

const Avtale = () => {
    const {
        privateAgreement,
        companyAgreement,
        setPrivateAgreement,
        setCompanyAgreement,
    } = useContext(BedriftContext);
    // const [privateCheckbox, setPrivateCheckbox] = useState<boolean>(false);
    // const [businessCheckbox, setBusinessCheckbox] = useState<boolean>(false);
    return (
        <div className="w-full max-w-4xl p-6 mt-6 pb-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-2xl font-bold dark:text-white mb-12 flex justify-around">
                Hva slags avtale skal denne bedriften ha?
            </h1>
            <div className="flex justify-around">
                {/* Venstre side */}
                <div>
                    <div className="flex items-center mb-10">
                        <input
                            id="private-checkbox"
                            type="checkbox"
                            checked={privateAgreement}
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={() =>
                                setPrivateAgreement(!privateAgreement)
                            }
                        />
                        <label
                            htmlFor="private-checkbox"
                            className="ml-2 text-1xl font-bold dark:text-white"
                        >
                            Privat avtale
                        </label>
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            id="privat-domene"
                            type="radio"
                            value=""
                            disabled={privateAgreement ? false : true}
                            name="privat-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="privat-domene"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Domene
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="privat-liste"
                            type="radio"
                            value=""
                            name="privat-radio"
                            disabled={privateAgreement ? false : true}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="privat-liste"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Liste
                        </label>
                    </div>
                </div>

                {/* Høyre side */}
                <div>
                    <div className="flex items-center mb-10">
                        <input
                            checked={companyAgreement}
                            id="bedrift-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={() =>
                                setCompanyAgreement(!companyAgreement)
                            }
                        />
                        <label
                            htmlFor="bedrift-checkbox"
                            className="ml-2 text-1xl font-bold dark:text-white"
                        >
                            Bedrift avtale
                        </label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="bedrift-domene"
                            type="radio"
                            value=""
                            name="bedrift-radio"
                            disabled={companyAgreement ? false : true}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="bedrift-domene"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Domene
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="bedrift-liste"
                            type="radio"
                            value=""
                            name="bedrift-radio"
                            disabled={companyAgreement ? false : true}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="bedrift-liste"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Liste
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Avtale;
