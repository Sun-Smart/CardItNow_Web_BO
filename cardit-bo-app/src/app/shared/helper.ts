//df27be02.ngrok.iof9d471fe.ngrok.io
export class DropDownValues {
  public label: any; public value: string;
  constructor() { }
}
export class AppConstants {//localhost:5000

  // public static get carditnowURL(): string { return "http://localhost:5000/carditnowapi"; }
  // public static get ntireboURL(): string { return "http://localhost:5000/carditnowapi"; }
  // public static get baseURL(): string { return "http://localhost:5000/carditnowapi"; }
  // public static get UploadURL(): string { return "http://localhost:7002/ntireboapi/file/upload"; }
  // public static get AttachmentURL(): string { return "http://localhost:5002/"; }
  public static get carditnowURL(): string { return "https://demo.herbie.ai/CardItNowAPI/carditnowapi"; }
  public static get ntireboURL(): string { return "https://demo.herbie.ai/CardItNowAPI/carditnowapi"; }
  public static get baseURL(): string { return "https://demo.herbie.ai/CardItNowAPI/carditnowapi"; }
  public static get UploadURL(): string { return "https://localhost:7002/ntireboapi/file/upload"; }
  public static get AttachmentURL(): string { return "https://demo.herbie.ai/CardItNowAPI/carditnowapi"; }

}

export class AppFunctions {

  public static iterate(obj) {
    // debugger;
    let ret;
    const isObject = val =>
      val && typeof val === 'object' && !Array.isArray(val);

    const addDelimiter = (a, b, c) =>
      a ? `${a}.${b}:${c}` : b;

    const paths = (obj = {}, head = '') => {
      return Object.entries(obj)
        .reduce((product, [key, value]) => {
          let fullPath = addDelimiter(head, key, value) + "\r\n";
          return isObject(value) ?
            product.concat(paths(value, fullPath))
            : product.concat(fullPath)
        }, []);
    }

    return paths(obj);

  }
  constructor(

  ) {
    //this.useraccesslistusers=await this.bousermasterservice.get_bousermasters_List();
    //this.useraccesslistroles=await this.bouserrolemasterservice.get_bouserrolemasters_List()

  }


}