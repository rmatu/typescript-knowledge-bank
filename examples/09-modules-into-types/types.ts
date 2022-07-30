export type ActionModule = typeof import("./constants");

export type Action = ActionModule[keyof ActionModule]; // "ADD_TODO" | "REMOVE_TODO" | "EDIT_TODO";
