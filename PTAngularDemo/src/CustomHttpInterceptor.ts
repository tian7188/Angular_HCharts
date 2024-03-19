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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzEwODU4NzA1LCJleHAiOjE3MTA5NDUxMDUsInNjb3BlIjoia3J1eC1kYXEtYXBpIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiWHJrOWc2V2J1bkdhVFlXYm5uNnBJYjNjMG5zcnRyenUifQ.Ym1Gxn0-b9G2DmpOp_nWn_7zX6qr9qxBvRXLResEtuy1n6EuOadNk4BM_Pbr_3VqyJKBNRCZJ6ZZNn2ZiT8ZZg7YRnlQT8BR07wB4MFc2566JlLM2Y87wsgi8x5Yo-Ad5H1b36FNb0Bx9h3xrHo6pDKppMpwzUOtYEEBlPrs0s5stLJZJwipYTXARRmCUTIVQUHaQh2VwkJcJCHDunb8mI5hUjB-zGTODDL5UARX3CkR5QOw2q6Pgu6j77aRN2vk2zw6RHGts6uQVdns97UBQFgp9CXxIzYJMyAVVzvIOXOKjoSNQFDPLNfkhFZcMHZnRgoX8EGAItJ90m82mUiZUw';
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

