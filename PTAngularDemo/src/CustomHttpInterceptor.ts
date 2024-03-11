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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpaRjJlNnIwLURCeG1YMUl0LUVoYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcnV4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJYcms5ZzZXYnVuR2FUWVdibm42cEliM2MwbnNydHJ6dUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kLWtydXhtZXRyaXgua3J1eGFuYWx5dGljcy5jb20va3J1eC1kYXEtYXBpIiwiaWF0IjoxNzEwMTY1OTY2LCJleHAiOjE3MTAyNTIzNjYsImF6cCI6IlhyazlnNldidW5HYVRZV2JubjZwSWIzYzBuc3J0cnp1Iiwic2NvcGUiOiJrcnV4LWRhcS1hcGkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.W04EVUZpJoT60pAOWvWvoVploadwb9wk1Nj5hbGG5PBFZxNshK6v3GuWxlcHitW-Zc1MMPOKdNlkvOjPDFNxwwLR4WNDLab-nLrre-GUOam4TOBAloaGhKhZzrFZ6ubDQPSGoTOUIGSp5C5fMLjlvXm84iLL00C2glXp3dxiYkrAhY4oJulSqljzWkt4EHcn9FTFhOOcRaWDiLEWX0--nHBbjG-X8Thw3KDW-jSrc-YH1YbWiOE9Qu4VV6dx99JAJb9gpuJ-RYSpQySGXnl8n_hk2JiLKEyEyzbmVT4Oc_yT-4AH8PWxO9_b9zPw8hSIz9adrsitqQ-QXsHQYLyI8Q';
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}

