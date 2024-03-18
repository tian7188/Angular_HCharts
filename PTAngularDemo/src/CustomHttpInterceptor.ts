import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the access token from wherever you store it
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzEwNzY3NTkzLCJleHAiOjE3MTA4NTM5OTMsInNjb3BlIjoia3J1eC1kYXEtYXBpIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiWHJrOWc2V2J1bkdhVFlXYm5uNnBJYjNjMG5zcnRyenUifQ.mt4yCwe7kMRjTvhEHHRM0GW-DqUlsl6Kq2EDnGnOa39OIYKI39AH_1Z4JsUocOfE7lwmCVe4v64Nt8m5BeDlG5UEkR20dA43qhBcTQebb0mDMh6VDJqt48j0K9359m-pDuJBBhq3bpE6qhTEvk67Zo7BQf27L7OhAFkuTrauCVwtKQne3ndeqzWNqbQgfFPEoKjBQyCvz8bBidVtr7b88G47xtc1-pur1shwhn75j0S4OiPVM6fu6vQWs3sd5xQo4Mt7DrtAH8t6w1PvohCC7lcjIIzQcN-YRVsXPRGpFSlQMc66typI2QsYhK234t3GirRIJinrbzmpLTWCitGL8Q';
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

