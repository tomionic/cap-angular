import { Component } from '@angular/core';
import { AppRate } from '@ionic-enterprise/app-rate/ngx';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private appRate: AppRate,
    private safariViewController: SafariViewController) { }

  rateApp(){
    this.appRate.setPreferences({
      usesUntilPrompt: prompt ? 3 : 20,
      simpleMode: true,
      customLocale: {
        title: 'Would you mind rating %@?',
        message: 'It won’t take more than a minute and helps to promote our app. Thanks for your support!',
        cancelButtonLabel: 'No, Thanks',
        laterButtonLabel: 'Remind Me Later',
        rateButtonLabel: 'Rate It Now',
        yesButtonLabel: 'Yes!',
        noButtonLabel: 'Not really',
        appRatePromptTitle: 'Do you like using %@',
        feedbackPromptTitle: 'Mind giving us some feedback?',
      },
      storeAppURL: {
        ios: '1586742271',
        android: 'market://details?id=com.jugglestreet.app',
      },
      openUrl: (url) => {
        this.safariViewController.show(
          {
            url,
            barColor: '#299C4A',
            controlTintColor: '#00ffff',
            tintColor: '#00ffff',
          }
        );
      },
    });
    this.appRate.promptForRating(true);
  }
}
