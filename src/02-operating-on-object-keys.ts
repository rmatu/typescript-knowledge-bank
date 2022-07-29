// https://www.youtube.com/watch?v=PEQn1a6xOHc

type RemoveMaps<T> = T extends `maps:${infer U}` ? U : T;

interface ApiData {
  "maps:longitude": string;
  "maps:latitude": string;
  awesome: boolean;
}

type RemoveMapsFromObj<T> = {
  [K in keyof T as RemoveMaps<K>]: T[K];
};

type DesiredShape = RemoveMapsFromObj<ApiData>;

// type DesiredShape = {
//   longitude: string;
//   latitude: string;
//   awesome: boolean;
// }
