import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Item } from '../../shared/entity/item';
import { ItemListService } from '../../service/item-list.service';

/**
 * Generated class for the QuestionWhere page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-question-where',
  templateUrl: 'question-where.html',
})
export class QuestionWherePage {
  private item: Item;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private itemListService: ItemListService
  ) {
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionWhere');
  }

  selected(value: number) {
    this.item.ort = value;
    this.item.updated = new Date();
    this.itemListService.copyToOtherSelected(this.item);
    this.navCtrl.pop();
  }

}
