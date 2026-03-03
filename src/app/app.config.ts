import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthState } from '@store/auth/state/auth.state';
import { provideStore } from '@ngxs/store';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
     provideClientHydration(),

     provideHttpClient(withFetch()),
     provideStore([AuthState])
    ]
};
