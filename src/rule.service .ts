import { Injectable } from '@nestjs/common';
import { ComparisonOperator, LogicOperator, Rule, RuleTemplate } from './TemplateRuleModel';

@Injectable()
export class RuleService {
  getTemplates(variables: Map<string,string> ): string[] {

    //let ruleTemplate = new RuleTemplate();
    // let motor = {
    //   rule: {
    //     logicOperator: 'OR',
    //     rules: [
    //       {
    //       logicOperator: null,
    //       propertyName: 'test',
    //       comparisonOperator: 'equal',
    //       value: 'cavalo',
    //       nullableCheck: false,
    //       rules: null,
    //       },
    //       {
    //         logicOperator: null,
    //         propertyName: 'first_name',
    //         comparisonOperator: 'equal',
    //         value: 'picles',
    //         nullableCheck: false,
    //         rules: null
    //       }
    //   ]
    //   },
    //   templateIds: ['123'],
    // };

    let ruleTemplate = new RuleTemplate();
    ruleTemplate.templateIds = ['1'];
    ruleTemplate.rule = new Rule();
    ruleTemplate.rule.logicOperator = LogicOperator.Non;
    ruleTemplate.rule.propertyName = 'test';
    ruleTemplate.rule.comparisonOperator = ComparisonOperator.equal;
    ruleTemplate.rule.value = 'picles';
    ruleTemplate.rule.nullableCheck = true;

    if (ruleTemplate.rule.logicOperator == LogicOperator.Non)
    {

    }
    //for (let rule of motor.rule)

    return ['1','2'];
  }
}
