import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

export class CustomNgbDateParserFormatter extends NgbDateParserFormatter {
	datePipe = new DatePipe('en-US');
	constructor(
		private dateFormatString: string) {
		super();
	}
	format(date: NgbDateStruct): string {
		////debugger;
		if (date === null) {
			return '';
		}
		try {
			return this.datePipe.transform(new Date(date.year, date.month - 1, date.day), 'MMM dd,y');// dd/MMM/y this.dateFormatString
		} catch (e: any) {
			return '';
		}
	}
	parse(value: string): NgbDateStruct {
		////debugger;
		let returnVal: NgbDateStruct;
		if (!value) {
			returnVal = null;
		} else {
			try {
				let dateParts = this.datePipe.transform(value, 'M-d-y').split('-');
				returnVal = { year: parseInt(dateParts[2]), month: parseInt(dateParts[0]), day: parseInt(dateParts[1]) };
			} catch (e: any) {
				returnVal = null;
			}
		}
		return returnVal;
	}
}