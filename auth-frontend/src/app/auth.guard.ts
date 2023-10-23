import {  inject } from '@angular/core';
import {  Router } from '@angular/router';
import { SessionService } from './session.service';

export const authGuard = () => {
  const session = inject(SessionService);
  // if loading user profile returns user => true, else false
  return session.loadUserProfile();
};
