// custom types for the ontology graph

export type OntologyNode = {
    id: string;
    name: string;
    state: string;
    parents: string[];
};

export type OntologyEdge = {
    source: string;
    target: string;
    label: string;
    weight: number;
};

export type OntologyFilter = {
    [key: string]: {
        parents: string[] | string;
        state: string;
        id: string;
        level: number;
        group: number;
    };
};

export type OntologyTree = {
    [key: string]: {
        id: string;
        name: string;
        description: string;
        children: OntologyTree;
    };
};

export type OntologyState = {
    filter: OntologyFilter | {};
    tree: OntologyTree | {};
    isLoading: Boolean;
};

export type AnalyticType = {
    id: string,
    name: string,
    description: string,
    paperTitle: string,
    paperURL: string,
    codeURL: string,
    why: string[]
    where: string[],
    what: string[]
}

export type AnalyticFilter = {
    why: string[],
    where: string[],
    what: string[]
}