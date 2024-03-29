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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzExNjM3MDIzLCJleHAiOjE3MTE3MjM0MjMsInNjb3BlIjoia3J1eC1kYXEtYXBpIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiWHJrOWc2V2J1bkdhVFlXYm5uNnBJYjNjMG5zcnRyenUifQ.QgpjKdirw9pjFGgd_OiGw0Ut27d0cC0c-LobPvDSxpu4f6xrG4CLTlTWbXQo3WEOwqnaKo5vGnCTvwgk_cnA09ck1Q4SGVky07LSKsh0t1Pjg3zFSo4iKz6M3uRkopZWm9Is8GzrtRhULoeFUZy58_ataPMpdCv4dhXZ296qxmhsS1FBqZZ3KWm-ekMX7CvUvalmOvbZg8T9kyjG2897QcynT0ctK6HAUF1_AYoQdvymuSjj-sklxFmRZ5PvZR3cOVmVswIKr0pCPGaPgbryVqyMVXNEBNaWcC1r045ruf27jJOFfnlpsBj46ILALKz1jmO__y3kGHIWxkFljEGndw';

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

