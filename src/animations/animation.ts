/**
 * Created by bandyg on 6/2/17.
 */
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';
//import { bounce, fadeInUp, fadeInDown, slideOutUp, bounceOutUp, fadeOutUp } from 'ng-animate';


/*
export const bounceAnimation =
  trigger('bounce', [transition('* => *', useAnimation(bounce))]);

export const fadeInOutAnimation =
  trigger('fadeInOut', [
                        transition(':enter', useAnimation(fadeInDown)),
                        transition(':leave', useAnimation(fadeOutUp, {params:{a:'0', b:'-100%'}}))
  ]);

export const fadeInDownAnimation =
  trigger('fadeInDown', [transition(':enter', useAnimation(fadeInDown, {delay:500}))]);
*/

export const slideInDownAnimation =
  trigger( 'SlideInDownAnimation',  [
    state( '*',
      style({
        opacity:1,
        transform:'translateX(0)'
      })
    ),
    transition( ':enter', [
      animate(1000, keyframes([
        style({opacity: 0, transform: 'scaleY(0)', offset: 0}),
        style({opacity: 0.5, transform: 'scaleY(0.5)',  offset: 0.3}),
        style({opacity: 1, transform: 'scaleY(1)',     offset: 1.0})
      ]))
    ]),
    transition( ':leave', [
      animate(1000, keyframes([
        style({opacity: 1, transform: 'scaleY(1)',     offset: 0}),
        style({opacity: 0.5, transform: 'scaleY(0.5)',  offset: 0.3}),
        style({opacity: 0, transform: 'scaleY(0)', offset: 1}),
      ]))
    ])
  ]);

export const rotateInOutAnimation =
  trigger( 'RotateInOutAnimation',  [
    state( '*',
      style({
        opacity:1,
        transform:'translateX(0)'
      })
    ),
    transition( ':enter', [
      animate(1000, keyframes([
        style({opacity: 0, width:0, height:0, transform: 'rotate(0deg)', offset: 0}),
        style({opacity: 0.5, width:'50%', height:'50%', transform: 'rotate(180deg)', offset: 0.3}),
        style({opacity: 1, width:'100%', height:'100%', transform: 'rotate(720deg)', offset: 1.0})
      ]))
    ]),
    transition( ':leave', [
      animate(1000, keyframes([
        style({opacity: 1, width:'100%', height:'100%', transform: 'rotate(0deg)', offset: 0}),
        style({opacity: 0.5, width:'50%', height:'50%', transform: 'rotate(180deg)', offset: 0.3}),
        style({opacity: 0, width:0, height:0, transform: 'rotate(720deg)', offset: 1})
      ]))
    ])
  ]);

export const shakeAnimation =
  trigger( 'ShakeAnimation',  [
    state( '*',
      style({
        opacity:1,
        transform: 'translate3d(0, 0, 0)'
      })
    ),
    transition( ':enter', [
      animate(1000, keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: 0.1, transform: 'translate3d(-10px, 0, 0)', offset: 0.1}),
        style({transform: 'translate3d(-10px, 0, 0)', offset: 0.2}),
        style({opacity: 0.3, transform: 'translate3d(10px, 0, 0)', offset: 0.3}),
        style({transform: 'translate3d(-10px, 0, 0)', offset: 0.4}),
        style({opacity: 0.6,transform: 'translate3d(10px, 0, 0)', offset: 0.5}),
        style({transform: 'translate3d(-10px, 0, 0)', offset: 0.6}),
        style({opacity: 0.9, transform: 'translate3d(10px, 0, 0)', offset: 0.7}),
        style({transform: 'translate3d(-10px, 0, 0)', offset: 0.8}),
        style({opacity: 1,transform: 'translate3d(10px, 0, 0)', offset: 0.9}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1}),
      ]))
    ]),
    transition( ':leave', [
      animate(1000, keyframes([
        style({opacity: 1, offset: 0}),
        style({transform: 'translate3d(-10px, 0, 0)', offset: 0.1}),
        style({transform: 'translate3d(-10px, 0, 0)', offset: 0.2}),
        style({transform: 'translate3d(10px, 0, 0)', offset: 0.3}),
        style({transform: 'translate3d(-10px, 0, 0)', offset: 0.4}),
        style({transform: 'translate3d(10px, 0, 0)', offset: 0.5}),
        style({opacity: 0.9,transform: 'translate3d(-10px, 0, 0)', offset: 0.6}),
        style({opacity: 0.6,transform: 'translate3d(10px, 0, 0)', offset: 0.7}),
        style({opacity: 0.3,transform: 'translate3d(-10px, 0, 0)', offset: 0.8}),
        style({opacity: 0.1,transform: 'translate3d(10px, 0, 0)', offset: 0.9}),
        style({opacity: 0, transform: 'translate3d(0, 0, 0)', offset: 1}),
      ]))
    ])
  ]);

export const RubberbanAnimation =
  trigger( 'rubberbanAnimation',  [
    state( '*',
      style({
        opacity:1
      })
    ),
    transition( ':enter', [
      animate(1000, keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: 1, transform: 'scale3d(1, 1, 1)', offset: 0.2}),
        style({transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3}),
        style({transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4}),
        style({transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5}),
        style({transform: 'scale3d(.95, 1.05, 1)', offset: 0.65}),
        style({transform: 'scale3d(1.05, .95, 1)', offset: 0.75}),
        style({transform: 'scale3d(1, 1, 1)', offset: 1}),
      ]))
    ]),
    transition( ':leave', [
      animate(1000, keyframes([
        style({opacity: 1, offset: 0}),
        style({transform: 'scale3d(1, 1, 1)', offset: 0.1}),
        style({transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3}),
        style({transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4}),
        style({transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5}),
        style({transform: 'scale3d(.95, 1.05, 1)', offset: 0.65}),
        style({transform: 'scale3d(1.05, .95, 1)', offset: 0.75}),
        style({opacity: 0,transform: 'scale3d(1, 1, 1)', offset: 1}),
      ]))
    ])
  ]);

export const PulseAnimation =
  trigger( 'pulseAnimation',  [
    state( '*',
      style({
        opacity:1
      })
    ),
    transition( ':enter', [
      animate(1000, keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: 0.25, transform: 'scale3d(1, 1, 1)', offset: 0.25}),
        style({opacity: 1,transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.5}),
        style({transform: 'scale3d(1, 1, 1)', offset: 0.75}),
      ]))
    ]),
    transition( ':leave', [
      animate(1000, keyframes([
        style({transform: 'scale3d(1, 1, 1)', offset: 0.25}),
        style({transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.5}),
        style({opacity: 0.5,transform: 'scale3d(1, 1, 1)', offset: 0.75}),
        style({opacity: 0, offset: 1})
      ]))
    ])
  ]);

export const FlashAnimation =
  trigger( 'flashAnimation',  [
    state( '*',
      style({
        opacity:1
      })
    ),
    transition( ':enter', [
      animate(1000, keyframes([
        style({opacity: 0, offset: 0.25}),
        style({opacity: 1, offset: 0.5}),
        style({opacity: 0, offset: 0.75}),
        style({opacity: 1, offset: 1})
      ]))
    ]),
    transition( ':leave', [
      animate(1000, keyframes([
        style({opacity: 1, offset: 0.25}),
        style({opacity: 0, offset: 0.5}),
        style({opacity: 1, offset: 0.75}),
        style({opacity: 0, offset: 1})
      ]))
    ])
  ]);

export const FadeAnimation =
  trigger( 'fadeAnimation',  [
    state("show", style({ opacity:1 })),
    state("hide", style({ opacity:0 })),
    transition( 'hide => show', [
      animate(1000)
    ]),
    transition( 'show => hide', [
      animate(1000)
    ])
  ]);
