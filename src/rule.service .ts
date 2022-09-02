import { Injectable } from '@nestjs/common';
import { ReplaceOptions } from './ReplaceOptions';
import { RuleExpression } from './RuleExpression';
import { ComparisonOperator, LogicOperator, Rule, RuleTemplate } from './TemplateRuleModel';
var expressions = require("angular-expressions");

@Injectable()
export class RuleService {
  getTemplates(replaceObj: ReplaceOptions ): string[] {


    let rules = this.getRules(replaceObj.ruleGroup);

    
    let expr = expressions.compile(rules.rule);
    let templateList = [];
    if( expr(replaceObj.replaceVariables)){
      templateList.push(rules.templateIds);
    }

    return templateList; 
  }

  // compare(variables: Map<string,string>, rule: Rule) : boolean {
  //   let result = false;
    
  //   if (rule.rule){
  //     result = this.compare(variables, rule.rule);
  //   }

  //   return result;
  // }

  getRules(group: string): RuleExpression {
    //TO DO: Get from DynamoDB
    let rule = new RuleExpression();
    rule.rule = "teste == 'cavalo'";
    rule.templateIds = ["template1"];
    return rule;
  }
}

