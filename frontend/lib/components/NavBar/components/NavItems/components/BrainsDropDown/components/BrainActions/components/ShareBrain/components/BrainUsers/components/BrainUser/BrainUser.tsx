/* eslint-disable max-lines */

import Field from "@/lib/components/ui/Field";
import { Select } from "@/lib/components/ui/Select";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";

import { RemoveAccessIcon } from "./components/RemoveAccessIcon";
import { useBrainUser } from "./hooks/useBrainUser";
import { BrainRoleType } from "../../../../../../types";
import { availableRoles } from "../../../../types";

type BrainUserProps = {
  email: string;
  rights: BrainRoleType;
  brainId: string;
  fetchBrainUsers: () => Promise<void>;
};

export const BrainUser = ({
  email,
  rights,
  brainId,
  fetchBrainUsers,
}: BrainUserProps): JSX.Element => {
  const {
    isRemovingAccess,
    canRemoveAccess,
    selectedRole,
    removeUserAccess,
    updateSelectedRole,
  } = useBrainUser({
    fetchBrainUsers: fetchBrainUsers,
    rights,
    brainId,
    email,
  });
  const { currentBrain } = useBrainContext();

  return (
    <div
      data-testid="assignation-row"
      className="flex flex-row align-center my-2 gap-3 items-center"
    >
      {canRemoveAccess && (
        <RemoveAccessIcon
          isRemovingAccess={isRemovingAccess}
          onClick={() => void removeUserAccess()}
        />
      )}
      <div className="flex flex-1">
        <Field
          name="email"
          required
          type="email"
          placeholder="Email"
          value={email}
          data-testid="role-assignation-email-input"
          readOnly
        />
      </div>
      <Select
        onChange={(newRole) => void updateSelectedRole(newRole)}
        value={selectedRole}
        options={availableRoles}
        readOnly={currentBrain?.rights !== "Owner" && selectedRole === "Owner"}
      />
    </div>
  );
};
