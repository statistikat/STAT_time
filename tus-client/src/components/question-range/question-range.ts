import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the QuestionRange component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'question-range',
  templateUrl: 'question-range.html'
})
export class QuestionRange {

  @Input()
  text: string;
  @Input()
  labelFrom: string;
  @Input()
  labelTo: string;
  @Input()
  result: number;
  @Output()
  resultChange = new EventEmitter<number>();

  private chk: boolean[] = new Array<boolean>(7);

  select(index: number): void {
    this.result = this.chk[index] ? index + 1 : undefined;
    this.unselectOtherOptions(index);
    this.resultChange.emit(this.result);
  }

  private unselectOtherOptions(index: number) {
    for (let i = 0; i < 7; i++) {
      if (i !== index) {
        this.chk[i] = false;
      }
    }
  }

}
