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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzEwMjcwOTMyLCJleHAiOjE3MTAzNTczMzIsImF6cCI6IlhyazlnNldidW5HYVRZV2JubjZwSWIzYzBuc3J0cnp1Iiwic2NvcGUiOiJrcnV4LWRhcS1hcGkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.ZQQxyN8k9vzFOeJN6RNG6bbymqYi1ivvFwtcwzF7biOu_CR0FjMNzTGnGSwQlcHxgyDcKWh4Xyp018pwauAOBefRHv3T0fUMUC96cfckUj1Jnw8jKDZukFazc5tGhs-ds61KsvB7jpPpYDSNK07LzApEq6Gt3PBsD2-IdH1fxLX0Q_BmgVgeOkc_rUmGYZm-D4bM4Svt89Uroyn_5bl1yyyuYGjrI0vsaygMzbIob0kQMwTkGQyXWglS75apSQPTbGunyvxkZn1S3uqqkR6H2Jqn1mlv9IzvIWGRHOswup43lwh7YxHPwEaBv8qQqk2i0czTR3JU61d5MadA7shv3Q';
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

