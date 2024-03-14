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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzEwNDI4MDYxLCJleHAiOjE3MTA1MTQ0NjEsImF6cCI6IlhyazlnNldidW5HYVRZV2JubjZwSWIzYzBuc3J0cnp1Iiwic2NvcGUiOiJrcnV4LWRhcS1hcGkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.W7M6tfbB1LlhdP90O7QJlW82MqFsdBHk6iz1ILLdwkDJUv8h3gxH52SxXP9A0ack-V6MbNc_CMcN7y4cqoTCRGGxBdGAv6kahBgSzkZDgohnIq_EQ7triA4XAz0ykhR8wmOKhmNxMSYWHvLQp9KFKj-LNDelBHk7glFWx5ijBD9E4qQ5vNdYqtpbp8SS8JyqfhnPpWaSPjeXucWJcUhv4PA4rpx36RiVFXCReWj82gWXhPXD5WV1Asi5pJO_KHspyarHasJAh_nQikfIMLK02r8pYGn7HMxt0cUTVepuITxuL7cqcCwyPFRWw7JoVKYnHmEQrVjvtFJGAN6PTdCqZg';
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

