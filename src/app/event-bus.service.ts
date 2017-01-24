import {Injectable} from '@angular/core';
import 'rxjs/Observable';
import 'rxjs/Observer';
import 'rxjs/Subject';
import {Subject, Observable} from "rxjs";

@Injectable()
export class EventBusService {

  messages$: Subject<EventBusArgs> = new Subject<EventBusArgs>();

  constructor() {
  }

  public emit(eventType: EventType, data: any):void {
    this.messages$.next({type: eventType, data: data});
  }

  public observe(eventType: EventType):Observable<any> {
    return this.messages$
      .filter(eba => eba.type === eventType)
      .map(args => args.data);
  }

}

export enum EventType {
  AppTitleChanged
}

interface EventBusArgs {
  type: EventType;
  data: any;
}

