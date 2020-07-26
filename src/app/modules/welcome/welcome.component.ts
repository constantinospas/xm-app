import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  constructor () { }

  ngOnInit (): void {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        // @ts-ignore
        window.confetti({
          particleCount: 50,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() },
        })
      }, i * 1000)
    }
  }

}
