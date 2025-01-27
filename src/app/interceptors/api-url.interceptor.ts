import { HttpInterceptorFn } from '@angular/common/http';
import { Environment } from '../environments/environment';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('http')) {
    req = req.clone({
      url: `${Environment.apiUrl}${req.url}`
    });
  }
  return next(req);
};
