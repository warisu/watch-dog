export type Severity = "INFO" | "WARNING" | "CRITICAL";
export type Chain = "STELLAR" | "ETHEREUM" | "POLYGON" | "BASE" | "ARBITRUM" | "OPTIMISM";

export type AlertDTO = {
  id: string;
  chain: Chain;
  txHash: string;
  contract: string;
  signature: string;
  severity: Severity;
  summary: string;
  acknowledged: boolean;
  createdAt: string;
};

export type WatchlistDTO = {
  id: string;
  label: string;
  chain: Chain;
  address: string;
  notes: string | null;
  createdAt: string;
};

export type RuleDTO = {
  id: string;
  name: string;
  signature: string;
  severity: Severity;
  enabled: boolean;
  watchlistId: string | null;
};
