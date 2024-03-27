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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzExNTUwMDk5LCJleHAiOjE3MTE2MzY0OTksInNjb3BlIjoia3J1eC1kYXEtYXBpIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiWHJrOWc2V2J1bkdhVFlXYm5uNnBJYjNjMG5zcnRyenUifQ.g6XQDWazEtxbF2QlMdbAj8bNJsHJE_XaUQga9yGLZ0NHUqhUIPOvHIh9WIh4kTH1r74fQwN2PovN8b5NXqgLHaSOIPXULWTHafqLwBm6773FyTZpSfwebCQ8OsPn2rvywFEnMCIJmB9E6Rsz33ZG4qI0mKrJqSaAtrv7tliHIDOPmuN7CsY-sGzS1rkrucJL9v8h4Pg-qZ9BG3bHcxxE5rYfv_FjnfZpYQt2b_Ao_hmy_8m-lm5WkzHTb7eX3uISRBFvw-IGTK1UAC9xlOPSwTHJZxbwazr-SzHNUoPv7hKcjqISo01VILVIqSdBGjDfQFlQa6LCYZvMzbYEqn5fsg';

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

