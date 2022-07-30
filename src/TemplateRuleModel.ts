
export class Rule {
    logicOperator?: LogicOperator;
    propertyName: string;
    comparisonOperator: ComparisonOperator;
    value: any;
    nullableCheck: boolean;
    rule: Rule;
}

export class RuleTemplate {
    rule: Rule;
    templateIds: string[];
}

export enum LogicOperator {
    Or,
    And,
    Non
}

export enum ComparisonOperator {
    equal,
    notEqual,
    greater,
    lesser,
    in,
}
