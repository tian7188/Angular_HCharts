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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzExNDczMTU1LCJleHAiOjE3MTE1NTk1NTUsInNjb3BlIjoia3J1eC1kYXEtYXBpIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiWHJrOWc2V2J1bkdhVFlXYm5uNnBJYjNjMG5zcnRyenUifQ.PvC7vMdrFKZ88lZvxzK5M0idbexLy1jp01qlJ486BPcm-Ip9wTsjBdqzBzJylclf0OVHr7YbFW2l-4nbY1EpPs2qKgn0PJ0HIQW5rJDVH7ZH5M5Oax0fMCFmfwoe-BmrfsreFPRdakJVwtanemR9WgeNqeC2BJXQhmPUUAjM8x0x8j7SqbqB5he2Lg9X4cPkZL3R7VKv6uyL0vEZFqtst3SCzOrER2iWYrqr6x0BQAMCZxRyD5I4urOA0ulKXFGzeVFbC3fHNVz7GMIXXha_E10D_zoi01Ow1dH2v8VnK3xBK0wz-IABoz9KdPqHfUjXQlTZksKoysItIn4_KOFhNQ';

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

