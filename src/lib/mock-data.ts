import { AlertDTO, RuleDTO, WatchlistDTO } from "./types";

export const MOCK_ALERTS: AlertDTO[] = [
  {
    id: "a1",
    chain: "ETHEREUM",
    txHash: "0x8f2c...a91d",
    contract: "0x1234...abcd",
    signature: "removeLiquidity",
    severity: "CRITICAL",
    summary: "82% of pooled liquidity is being withdrawn from the WETH/TOKEN pair.",
    acknowledged: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: "a2",
    chain: "STELLAR",
    txHash: "b7ea...44f1",
    contract: "CBQH...ZK3M",
    signature: "transferOwnership",
    severity: "WARNING",
    summary: "Soroban contract admin role is being transferred to a new account.",
    acknowledged: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
  },
  {
    id: "a3",
    chain: "BASE",
    txHash: "0x5511...ff02",
    contract: "0x9988...0011",
    signature: "mint",
    severity: "CRITICAL",
    summary: "Unscheduled mint of 4,200,000 tokens detected, ~11% supply increase.",
    acknowledged: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 51).toISOString(),
  },
  {
    id: "a4",
    chain: "ETHEREUM",
    txHash: "0x2ab0...9e7c",
    contract: "0x1234...abcd",
    signature: "setFee",
    severity: "WARNING",
    summary: "Sell tax parameter changed from 3% to 25%.",
    acknowledged: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
];

export const MOCK_WATCHLISTS: WatchlistDTO[] = [
  {
    id: "w1",
    label: "Treasury multisig",
    chain: "ETHEREUM",
    address: "0x1234...abcd",
    notes: "Primary protocol treasury contract.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "w2",
    label: "Soroban vault",
    chain: "STELLAR",
    address: "CBQH...ZK3M",
    notes: "Core lending vault on Soroban.",
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_RULES: RuleDTO[] = [
  { id: "r1", name: "Liquidity drain guard", signature: "removeLiquidity", severity: "CRITICAL", enabled: true, watchlistId: "w1" },
  { id: "r2", name: "Ownership watch", signature: "transferOwnership", severity: "WARNING", enabled: true, watchlistId: null },
  { id: "r3", name: "Mint watch", signature: "mint", severity: "CRITICAL", enabled: true, watchlistId: null },
  { id: "r4", name: "Fee tampering", signature: "setFee", severity: "WARNING", enabled: false, watchlistId: "w1" },
];
