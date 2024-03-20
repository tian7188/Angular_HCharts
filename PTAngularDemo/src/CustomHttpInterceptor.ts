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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzEwOTQ1ODMwLCJleHAiOjE3MTEwMzIyMzAsInNjb3BlIjoia3J1eC1kYXEtYXBpIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiWHJrOWc2V2J1bkdhVFlXYm5uNnBJYjNjMG5zcnRyenUifQ.m1BkPWAYTNMu_KBtRGmdEEvAdWX7MKQpnnXkpH6PT5eT_MPhPTFc7NA2cXZri6oiBLhlu1g3goKv51DgvpG-9MO5bVSvMBxnPc3V9zhx0aP3F2RPItqZ_9tJb3k2FyQTSnk_S8FXz86QFNX7nFudhyHBekPIL2jP71CN5M0Ad8CkopFT_x__KbmV1AuPio-SR9skwZwnJQf4eb6ONq5ajaqHYerWDiKPmvqNOb0JFEgPdwOxLBdXhlTTXlMWViDuPO30GaXs72H9N90HqpnZ3ofAfIayI8mCXW-NFDuibhenosTSRWmCUWPgsAll0jVP1VCgcrhnvRzuUQE5ZsLOLw';

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

