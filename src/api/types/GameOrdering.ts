//ใช้ตอน fetch api
//project ไม่รองรับการใช้ enum
export const GameOrdering = {
  NameAsc: "name",
  NameDesc: "-name",
  ReleasedAsc: "released",
  ReleasedDesc: "-released",
  AddedAsc: "added",
  AddedDesc: "-added",
  CreatedAsc: "created",
  CreatedDesc: "-created",
  UpdatedAsc: "updated",
  UpdatedDesc: "-updated",
  RatingAsc: "rating",
  RatingDesc: "-rating",
  MetacriticAsc: "metacritic",
  MetacriticDesc: "-metacritic",
} as const;

export type GameOrdering = (typeof GameOrdering)[keyof typeof GameOrdering];


//ใช้กับ sort by
export type SortOption = "name" | "released" | "popularity";

export const SortByMap: Record<SortOption, string> = {
  name: GameOrdering.NameAsc,
  released: GameOrdering.ReleasedDesc,
  popularity: GameOrdering.AddedDesc,
};
