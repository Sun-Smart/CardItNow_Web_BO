import {
  Component, Input,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit, forwardRef, ViewContainerRef
} from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  DAYS_OF_WEEK,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { CalendarModule, DateAdapter } from 'angular-calendar';//as CalendarAGModule
import { BOReportViewerService } from '../../../service/boreportviewer.service';
import { CommonModule } from '@angular/common';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SessionService } from '../../../pages/core/services/session.service';
import { SharedService } from '../../../service/shared.service';
import { EventColor } from 'calendar-utils';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
interface CalendarFormEvent extends CalendarEvent {
  id: number;
}

@Component({
  selector: 'calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calendarform.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarFormComponent),
      multi: true
    }
  ]
})
export class CalendarFormComponent implements OnInit, ControlValueAccessor {
  maindata:any;
  theme: string = "";//current theme
  @Input() value: any;
  @Input() reportid: any;
  @Input() fkname: string;
  sessiondata: any;
  paramid: any;
  @ViewChild('container', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  onChange: any = () => {
    console.log('value1');
  };
  onTouched: any = () => { };


  registerOnChange(fn) {
    console.log('value3');
    this.onChange = fn;
  }


  writeValue(value) {
    console.log('value2');
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }



  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  configdata: any;
  cols: any;
  data: any;

  //view: CalendarView;;
  view;//= CalendarView.Month;
  weekStartsOn = DAYS_OF_WEEK.SUNDAY;
  weekEndsOn = DAYS_OF_WEEK.SATURDAY;
  CalendarView = CalendarView;
  viewDate: Date;
  //  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarFormEvent[] = [];
  /*
    events: CalendarFormEvent[] = [
      {
        id:0,
        start: subDays(startOfDay(new Date()), 1),
        end: addDays(new Date(), 1),
        title: 'A 3 day event',
        color: colors.red,
        actions: this.actions,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      },
      {
        id:0,
        start: startOfDay(new Date()),
        title: 'An event with no end date',
        color: colors.yellow,
        actions: this.actions
      },
      {
        id:0,
        start: subDays(endOfMonth(new Date()), 3),
        end: addDays(endOfMonth(new Date()), 3),
        title: 'A long event that spans 2 months',
        color: colors.blue,
        allDay: true
      },
      {
        id:0,
        start: addHours(startOfDay(new Date()), 2),
        end: addHours(new Date(), 2),
        title: 'A draggable and resizable event',
        color: colors.yellow,
        actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      }
    ];
  */



  activeDayIsOpen: boolean = false;

  constructor(private router: Router, private modal: NgbModal, public sharedService: SharedService, private boreportviewerservice: BOReportViewerService, private sessionService: SessionService,
    private currentRoute: ActivatedRoute) {
    //debugger;
    this.currentRoute.params.subscribe(params => {
      this.reportid = null;
      this.paramid = params.id;
      this.paramsChange(params.id);
    });
  }
  ngOnInit() {
    let id = this.currentRoute.snapshot.paramMap.get('id');
    this.sessiondata = this.sessionService.getSession();
    this.theme = this.sessionService.getItem('selected-theme');
    this.Initialize(id);

  }
  paramsChange(id) {
    //debugger;
    if (this.container != undefined) this.container.clear();
    this.Initialize(id);
  }
  Initialize(id) {
    let status = "'A'";

    //debugger;

    if (this.currentRoute.snapshot.paramMap.get('fkname') != null && this.currentRoute.snapshot.paramMap.get('fk') != null) {
      this.fkname = this.currentRoute.snapshot.paramMap.get('fkname');
      this.value = this.currentRoute.snapshot.paramMap.get('fk');
    }


    debugger;
    if ((this.reportid == null || this.reportid == undefined) && (id != null && id != undefined)) this.reportid = id;
    if (this.reportid == null || this.reportid == undefined) this.reportid = 300;
    this.boreportviewerservice.fkname = this.fkname
    this.boreportviewerservice.fk = this.value
    this.boreportviewerservice.fkname1 = null
    this.boreportviewerservice.fk1 = null
    this.boreportviewerservice.getBOReportResultsByID((this.reportid), status, null, null, null).then((res: any) => {
      ////debugger;
      this.configdata = res.boreport;
      this.cols = res.boreportcolumn;
      this.data = res.results.Rows;
      this.events = [];
      for (let i = 0; i < this.data.length; i++) {
        let id = 0;
        if (this.data[i].pkcol != undefined) id = this.data[i].pkcol;
        var evt = {
          id: id,
          start: new Date(this.data[i].start),//
          end: new Date(this.data[i].end),//
          title: this.data[i].title,
          color: this.data[i].color,
          actions: this.actions,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true
        }
        this.events.push(evt);
      }
      /*
      var obj = (document.getElementsByClassName("cal-today")[0]) as any;
      console.log(obj);
      //debugger;
      obj.click();
      */
      this.viewDate = new Date();
      this.view = CalendarView.Month;

      //this.refresh.next();
    });
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    //debugger;
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }

    if (events.length === 0) {
      let formname = this.configdata.maintablename;
      this.router.navigate(['/home/' + formname + '/' + formname]);
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          id: 0,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
    //debugger;
    if (action == 'Edited') {
      let formname = this.configdata.maintablename;
      this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + event.id]);
    }
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        id: 0,
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
