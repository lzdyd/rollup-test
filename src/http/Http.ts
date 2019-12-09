export interface IHttp {
   get(): string
}

export default class Http implements IHttp {
  constructor(private baseUrl: string) {

  }

  get() {
    return this.baseUrl;
  }
}

