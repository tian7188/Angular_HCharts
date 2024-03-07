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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzA5NzU4NDU3LCJleHAiOjE3MDk4NDQ4NTcsImF6cCI6IlhyazlnNldidW5HYVRZV2JubjZwSWIzYzBuc3J0cnp1Iiwic2NvcGUiOiJrcnV4LWRhcS1hcGkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.10nY10blHoG_lMj9oHKVpzgiDY0jDB22ikFragcAmCZVYNdmwKYMZYN_q6KDzRVDJvuO_nY7ahC2G2VAlFF7J9BFYByXIMzRIYp74m1VgzHSv-KXjexq23huOVfXT3Vrj6wUqqth0-Ggne0FCECswcV8YlAeBbUwByLsThdNWHpmqPadicaSvFfuwqcVH_kd_dgWA-JCyjSHw4b2cFJxb2B2Wx5fY9dVRRDNWpM2rLU8qO1wX9J9uQhLxQZT0x7qBbjCTlznGaURcHxlplpNG6bQ2WcAzV5zA5GwIkHC5_oNi8_zvgIx-Rl5bamRyR8mbeg3BOCvxqRdqIr6sQgRGQ';

    // Clone the request and add the authorization header
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

