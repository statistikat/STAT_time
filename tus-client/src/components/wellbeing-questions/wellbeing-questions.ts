import { Component, Input } from '@angular/core';

import { Wellbeing } from '../../shared/entity/wellbeing';

/**
 * Generated class for the WellbeingQuestions component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'wellbeing-questions',
  templateUrl: 'wellbeing-questions.html'
})
export class WellbeingQuestions {
  @Input()
  wellbeing: Wellbeing;
  @Input()
  feel: string;
  @Input()
  like: string;

}
