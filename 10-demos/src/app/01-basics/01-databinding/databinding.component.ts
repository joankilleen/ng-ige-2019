import { Component } from '@angular/core';

@Component({
  selector: 'aw-databinding',
  templateUrl: './databinding.component.html',
})
export class DatabindingComponent {

  name = 'Angular';
  message1 = 'You are';
  message2 = 'a great framework!';

  color = 'red';

  onChange(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
  }

  onChange2(value: string) {
    // Note: it is also possible to pass a value by accessing the
    // property in the template expression like `onChange2($event.target.value)`
    // Unfortunately Webstorm/IntelliJ does not like that since 2019.1
    this.name = value;
  }
}
