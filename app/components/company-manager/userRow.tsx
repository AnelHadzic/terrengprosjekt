import { UserWithAgreementStatus } from "@/app/lib/model/user/types/UserWithAgreementStatus";

export function userRow(
  item: UserWithAgreementStatus,
  handleAgreementTypeChange: (
    user: UserWithAgreementStatus,
    newAgreementType: string
  ) => Promise<void>
) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-900 transition-all cursor-pointer">
      <th
        scope="row"
        className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.email}
      </th>
      <td className="px-6 py-4">
        {item.companyInfo === undefined
          ? "Ukjent Bedrift"
          : item.companyInfo?.companyName}
      </td>
      <td className="px-6 py-4">{item.phone}</td>
      <td className="px-6 py-4">{item.primaryCarRegNumber}</td>
      <td
        className={`px-6 py-4 ${item.status === "NoAgreement" ? "text-red-500" : ""}`}
      >
        <select
          value={item.status}
          onChange={(e) => handleAgreementTypeChange(item, e.target.value)}
        >
          <option value="ListByPrivateAgreement">Privat (whitelist)</option>
          <option value="ListByCompanyAgreement">Bedrift (whitelist)</option>
          <option value="NoAgreement">Ingen whitelist</option>
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
