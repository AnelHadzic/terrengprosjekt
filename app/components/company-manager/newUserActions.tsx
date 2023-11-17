import { UserWithAgreementStatus } from "@/app/lib/model/user/types/UserWithAgreementStatus";

export function newUserActions(
  newUser: UserWithAgreementStatus | null,
  handleSaveNewUser: () => Promise<void>,
  handleCancelNewUser: () => void,
  handleAddNewUser: () => void
) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-900  transition-all cursor-pointer">
      {newUser ? (
        <>
          <td
            onClick={() => handleSaveNewUser()}
            colSpan={3}
            className="px-6 py-4 hover:bg-green-100 hover:underline"
          >
            Lagre
          </td>
          <td
            onClick={() => handleCancelNewUser()}
            colSpan={2}
            className="px-6 py-4 hover:bg-red-100 hover:underline"
          >
            Avbryt
          </td>
        </>
      ) : (
        <td
          onClick={() => handleAddNewUser()}
          colSpan={5}
          className="px-6 py-4 hover:bg-green-100 hover:underline"
        >
          + Legg til ny bruker i whitelist
        </td>
      )}
    </tr>
  );
}
