import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Item } from '../../shared/entity/item';
import { ItemListService } from '../../service/item-list.service';

/**
 * Generated class for the QuestionWho page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-question-who',
  templateUrl: 'question-who.html',
})
export class QuestionWhoPage {
  private item: Item;
  private changed: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private itemListService: ItemListService
  ) {
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionWho');
  }

  aloneTapped() {
    if (this.item.allein) {
      this.item.partner = false;
      this.item.kind = false;
      this.item.mitglied = false;
      this.item.andere = false;
    }
    this.changed = true;
  }

  notAloneTapped() {
    if (this.item.partner || this.item.kind || this.item.mitglied || this.item.andere) {
      this.item.allein = false;
    }
    this.changed = true;
  }

  close() {
    if (this.changed) {
      this.item.updated = new Date();
      this.itemListService.copyToOtherSelected(this.item);
      this.changed = false;
    }
    this.navCtrl.pop();
  }

}
