import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AppConfigService {

  constructor() { }

  env = environment;

  restResource(resource: string) {
    return this.env.rest_provider + "/" + resource
  }

}
