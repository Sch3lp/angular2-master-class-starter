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

  public emit(eventType: string, data: any):void {
    this.messages$.next(new EventBusArgs(eventType, data));
  }

  public observe(eventType: string):Observable<any> {
    return this.messages$
      .filter(eba => eba.type === eventType)
      .map(args => args.data);
  }

}

class EventBusArgs {
  constructor(
    public type: string,
    public data: any
  ){}
}
