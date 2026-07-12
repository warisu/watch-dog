/**
 * Registry of known "danger signatures" — function names / selectors that,
 * when seen in a pending (unconfirmed) transaction, commonly precede a rug
 * pull, an ownership takeover, or a liquidity drain.
 *
 * This is detection metadata only: it is used to flag and alert on
 * transactions that are *about to happen*, so a team can react before
 * confirmation. It intentionally does not include any exploit or
 * transaction-construction logic.
 */
export type DangerSignature = {
  id: string;
  label: string;
  description: string;
  defaultSeverity: "INFO" | "WARNING" | "CRITICAL";
};

export const DANGER_SIGNATURES: DangerSignature[] = [
  {
    id: "renounceOwnership",
    label: "Ownership renounced",
    description:
      "Contract owner is giving up admin control. Often benign, but also used to lock in a malicious state permanently.",
    defaultSeverity: "WARNING",
  },
  {
    id: "transferOwnership",
    label: "Ownership transfer",
    description: "Admin rights are moving to a new address.",
    defaultSeverity: "WARNING",
  },
  {
    id: "removeLiquidity",
    label: "Liquidity removal",
    description: "A large share of pool liquidity is being withdrawn, a common precursor to a rug pull.",
    defaultSeverity: "CRITICAL",
  },
  {
    id: "setFee",
    label: "Fee parameter change",
    description: "Buy/sell tax or fee percentage is being modified, sometimes to an extractive value.",
    defaultSeverity: "WARNING",
  },
  {
    id: "mint",
    label: "Unscheduled mint",
    description: "New tokens are being minted outside an expected schedule, diluting holders.",
    defaultSeverity: "CRITICAL",
  },
  {
    id: "pause",
    label: "Contract paused",
    description: "Transfers or trading are being halted, which can trap user funds.",
    defaultSeverity: "WARNING",
  },
  {
    id: "blacklistAddress",
    label: "Address blacklisted",
    description: "A wallet is being blocked from transferring or selling the token.",
    defaultSeverity: "WARNING",
  },
  {
    id: "upgradeProxy",
    label: "Proxy implementation upgrade",
    description: "The logic behind an upgradeable proxy is changing, which can alter contract behavior entirely.",
    defaultSeverity: "CRITICAL",
  },
];

export function findSignature(id: string): DangerSignature | undefined {
  return DANGER_SIGNATURES.find((s) => s.id === id);
}
