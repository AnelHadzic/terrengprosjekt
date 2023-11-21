import { ICompany } from "@/app/lib/interface/ICompany";
import { UserWithAgreementStatus } from "@/app/lib/model/user/types/UserWithAgreementStatus";
import { SetStateAction } from "react";
import { toast } from "react-toastify";

export function newUserTableRow(newUser: UserWithAgreementStatus, setNewUser: { (value: SetStateAction<UserWithAgreementStatus | null>): void; (arg0: { email: string; firstname: string | undefined; lastname: string | undefined; phone: string | undefined; created: Date | undefined; token: string | undefined; role: number | undefined; companyInfo: ICompany | undefined; carRegNumbers: string[] | undefined; primaryCarRegNumber: string | undefined; status: string; }): void; }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900 transition-all cursor-pointer">
      <td className="px-6 py-4">
        <input
          className="w-36"
          type="text"
          placeholder="ola@nordmann.no"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
      </td>
      <td className="px-6 py-4">{newUser.companyInfo?.companyName}</td>
      <td
        onClick={() => toast.warning("Mobilnummer skal settes av bruker ved først login.")}
        className="px-6 py-4"
      ></td>
      <td
        onClick={() => toast.warn("Regnr skal settes av bruker ved først login.")}
        className="px-6 py-4"
      ></td>
      <td
        className={`px-6 py-4 ${newUser.status === "NoAgreement" ? "text-red-500" : ""}`}
      >
        <select
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
        >
          <option value="ListByPrivateAgreement">Privat</option>
          <option value="ListByCompanyAgreement">Bedrift</option>
          <option value="NoAgreement">Ingen avtale</option>
          <option value="DomainByPrivateAgreement" disabled>
            Privat (fra domene)
          </option>
          <option value="DomainByCompanyAgreement" disabled>
            Bedrift (fra domene)
          </option>
        </select>
      </td>
    </tr>
  );
}
