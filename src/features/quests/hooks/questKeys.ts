// key factory
export const questKeys = {
  // basic key for quests
  all: (campaignId: string) => ["campaigns", campaignId, "quests"] as const,

  // key for sidebar quest tree
  tree: (campaignId: string) => [...questKeys.all(campaignId), "tree"] as const,

  // key for quest details
  details: () => ["details"] as const,

  // quest details instance key
  quest: (campaignId: string, questId: string) =>
    [...questKeys.all(campaignId), questId, ...questKeys.details()] as const,
};
