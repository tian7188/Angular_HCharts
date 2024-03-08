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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzA5ODQ2ODcyLCJleHAiOjE3MDk5MzMyNzIsImF6cCI6IlhyazlnNldidW5HYVRZV2JubjZwSWIzYzBuc3J0cnp1Iiwic2NvcGUiOiJrcnV4LWRhcS1hcGkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.vmH8vPRDPlpCK243KxeubgZedIFRk6Cy-HOY9eWUPr1_xGggNES2RIpYOYIp0xigHKc0_sFNRkXw9fa7qG4rIetJRq_NE7moPeBVh1K1qLUkrGza2cxyq_QijO6Obdd_IuzPCDi0D89Eh6efpoXzUcP6XCRI6w-OQ9F_sZ_cXGVhLry_FOnoFD6J0zacXCqwzSXKp39zZTp0iJ9TsY6lj6LKRL4YQFxBAY1b278Zf0o-VR_vaLWmhBkPDeeMrXuD3SK3IzEGQYY5C-n5ndL_lXRUxEjL6ZBadyPNsZ-rPb9jHqIXha1nwM114W6KgcM-2iHrulas-zygnCVhqI027w'
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

