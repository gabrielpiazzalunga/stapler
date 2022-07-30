import { Injectable } from '@nestjs/common';
import { ComparisonOperator, LogicOperator, Rule, RuleTemplate } from './TemplateRuleModel';
var expressions = require("angular-expressions");

@Injectable()
export class RuleService {
  getTemplates(variables: Map<string,string> ): string[] {


    let received = {rule: "teste == 'cavalo'",
                    template: "template1"};
    let expr = expressions.compile(received.rule);
    let templateList = [];
    if( expr(variables)){
      templateList.push(received.template);
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
}

