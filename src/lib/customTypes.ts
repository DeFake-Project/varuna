// Varuna Ontology (c) by DeFake Project
// 
// Varuna Ontology is licensed under a
// Creative Commons Attribution 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <https://creativecommons.org/licenses/by/4.0/>.

// custom types for the ontology graph

export type OntologyNode = {
    id: string;
    name: string;
    group: number;
    description?: string;
};

export type OntologyEdge = {
    source: string;
    target: string;
    label: string;
    weight: number;
    type: string;
};

export type OntologyFilter = {
    [key: string]: OntologyNode & {
        children: string[];
        parents: string[];
        state: string;
        level: number;
    };
};

export type OntologyTree = {
    [key: string]: OntologyNode & {
        children: OntologyTree;
    };
};

// analytics types

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

// study data types

export type StudyDataType = {
    [key: string]: {
        [key: string]: {
            type: string,
            content: string[]
        }
    }
}

// app state types

export type OntologyState = {
    filter: OntologyFilter | {};
    tree: OntologyTree | {};
    isLoading: Boolean;
    startTime: number;
};

// misc types

export type AnalyticFilter = {
    why: string[],
    where: string[],
    what: string[]
}