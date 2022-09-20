// Generated by https://quicktype.io

export interface Elections {
  main:        Election[];
  auxillary?:   Election[];
  referendums?: Referendum[];
}

export interface Election {
  type:       string;
  year:       number;
  startDate?:  string;
  endDate?:    string;
  wikidataId?: string;
  precincts?: number[];
  round?:     number;
  volbyczId?: string;
}

export interface Referendum {
  type:       string;
  name:       string;
  year:       number;
  startDate?:  string;
  endDate?:    string;
  wikidataId?: string;
}
