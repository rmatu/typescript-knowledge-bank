interface ColorVariants {
  primary: "blue";
  secondary: "red";
  tertiary: "green";
}

type PrimaryColor = ColorVariants["primary"]; // type PrimaryColor = "blue"
type NonPrimaryColor = ColorVariants["secondary" | "tertiary"]; // type NonPrimaryColor = "red" | "green"
type EveryColor = ColorVariants[keyof ColorVariants]; // type EveryColor = "blue" | "red" | "green"

type Letters = ["a", "b", "c"];

type AOrB = Letters[0 | 1]; // type AOrB = "a" | "b";
type Letter = Letters[number]; // type Letter = "a" | "b" | "c";

interface UserRoleConfig {
  user: ["view", "create", "update"];
  superAdmin: ["view", "create", "update", "delete"];
}

// 🤯 this one is crazy
type Role = UserRoleConfig[keyof UserRoleConfig][number]; // type Role = "view" | "create" | "update" | "delete"
