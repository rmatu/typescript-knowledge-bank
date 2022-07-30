// https://www.youtube.com/watch?v=8gDpiILuf2I

import { String, Union } from "ts-toolbelt";

const query = `/home?a=wonderful&b=wow`;

type Query = typeof query; // /home?a=wonderful&b=wow;

type SeconQueryPart = String.Split<Query, "?">[1]; // "a=wonderful&b=wow"
type QueryElements = String.Split<SeconQueryPart, "&">; // ["a=wonderful", "b=wow"]

type QueryParams = {
  [QueryElement in QueryElements[number]]: {
    [Key in String.Split<QueryElement, "=">[0]]: String.Split<QueryElement, "=">[1];
  };
}[QueryElements[number]];

const obj: Union.Merge<QueryParams> = {
  a: "wonderful",
  b: "wow",
};

// const obj: {
//   a: "wonderful";
//   b: "wow";
// }
