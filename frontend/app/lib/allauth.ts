import { getCSRFToken } from './django'

export const Client = {
  APP: 'app',
  BROWSER: 'browser'
} as const;

export type ClientType = (typeof Client)["APP"] | (typeof Client)["BROWSER"];

export const settings: {
  client: ClientType;
  baseUrl: string;
  withCredentials: boolean;
} = {
  client: Client.BROWSER,
  baseUrl: `/api/_allauth/${Client.BROWSER}/v1`,
  withCredentials: false
}

const ACCEPT_JSON = {
  accept: 'application/json'
}

export const AuthProcess = {
  LOGIN: 'login',
  CONNECT: 'connect'
} as const;

export type AuthProcessType = (typeof AuthProcess)["LOGIN"] | (typeof AuthProcess)["CONNECT"];

export const Flows = {
  LOGIN: 'login',
  LOGIN_BY_CODE: 'login_by_code',
  MFA_AUTHENTICATE: 'mfa_authenticate',
  MFA_REAUTHENTICATE: 'mfa_reauthenticate',
  MFA_TRUST: 'mfa_trust',
  MFA_WEBAUTHN_SIGNUP: 'mfa_signup_webauthn',
  PASSWORD_RESET_BY_CODE: 'password_reset_by_code',
  PROVIDER_REDIRECT: 'provider_redirect',
  PROVIDER_SIGNUP: 'provider_signup',
  REAUTHENTICATE: 'reauthenticate',
  SIGNUP: 'signup',
  VERIFY_EMAIL: 'verify_email',
} as const;

export const URLs = {
  // Meta
  CONFIG: '/config',

  // Account management
  CHANGE_PASSWORD: '/account/password/change',
  EMAIL: '/account/email',
  PROVIDERS: '/account/providers',

  // Account management: 2FA
  AUTHENTICATORS: '/account/authenticators',
  RECOVERY_CODES: '/account/authenticators/recovery-codes',
  TOTP_AUTHENTICATOR: '/account/authenticators/totp',

  // Auth: Basics
  LOGIN: '/auth/login',
  REQUEST_LOGIN_CODE: '/auth/code/request',
  CONFIRM_LOGIN_CODE: '/auth/code/confirm',
  SESSION: '/auth/session',
  REAUTHENTICATE: '/auth/reauthenticate',
  REQUEST_PASSWORD_RESET: '/auth/password/request',
  RESET_PASSWORD: '/auth/password/reset',
  SIGNUP: '/auth/signup',
  VERIFY_EMAIL: '/auth/email/verify',

  // Auth: 2FA
  MFA_AUTHENTICATE: '/auth/2fa/authenticate',
  MFA_REAUTHENTICATE: '/auth/2fa/reauthenticate',
  MFA_TRUST: '/auth/2fa/trust',

  // Auth: Social
  PROVIDER_SIGNUP: '/auth/provider/signup',
  REDIRECT_TO_PROVIDER: '/auth/provider/redirect',
  PROVIDER_TOKEN: '/auth/provider/token',

  // Auth: Sessions
  SESSIONS: '/auth/sessions',

  // Auth: WebAuthn
  REAUTHENTICATE_WEBAUTHN: '/auth/webauthn/reauthenticate',
  AUTHENTICATE_WEBAUTHN: '/auth/webauthn/authenticate',
  LOGIN_WEBAUTHN: '/auth/webauthn/login',
  SIGNUP_WEBAUTHN: '/auth/webauthn/signup',
  WEBAUTHN_AUTHENTICATOR: '/account/authenticators/webauthn'
};

export const AuthenticatorType = {
  TOTP: 'totp',
  RECOVERY_CODES: 'recovery_codes',
  WEBAUTHN: 'webauthn'
};

export type AuthenticatorTypeValue = 'totp' | 'recovery_codes' | 'webauthn';

// Type pour les réponses de l'API
export interface ApiResponse<T = any> {
  status: number;
  message?: string;
  data?: T;
  errors?: { message: string }[];
  meta?: {
    is_authenticated?: boolean;
    session_token?: string;
    [key: string]: any;
  };
}

function postForm(action: string, data: Record<string, string>) {
  if (typeof window === 'undefined') {
    console.error('postForm ne peut être utilisé que côté client');
    return;
  }
  
  const f = document.createElement('form')
  f.method = 'POST'
  f.action = settings.baseUrl + action

  for (const key in data) {
    const d = document.createElement('input')
    d.type = 'hidden'
    d.name = key
    d.value = data[key]
    f.appendChild(d)
  }
  document.body.appendChild(f)
  f.submit()
}

const tokenStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key);
    }
  }
};

export function getSessionToken(): string | null {
  return tokenStorage.getItem('sessionToken')
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

async function request<T = any>(
  method: HttpMethod, 
  path: string, 
  data?: any, 
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  if (typeof window === 'undefined') {
    console.error('request ne peut être utilisé que côté client');
    return { status: 500, message: 'API non disponible côté serveur' };
  }
  
  const options: RequestInit = {
    method,
    headers: {
      ...ACCEPT_JSON,
      ...headers
    },
    credentials: settings.withCredentials ? 'include' as RequestCredentials : undefined
  }
  
  if (path !== URLs.CONFIG) {
    if (settings.client === Client.BROWSER) {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        (options.headers as Record<string, string>)['X-CSRFToken'] = csrfToken;
      }
    } else if (settings.client === Client.APP) {
      (options.headers as Record<string, string>)['User-Agent'] = 'django-allauth example app';
      const sessionToken = getSessionToken();
      if (sessionToken) {
        (options.headers as Record<string, string>)['X-Session-Token'] = sessionToken;
      }
    }
  }

  if (typeof data !== 'undefined') {
    options.body = JSON.stringify(data);
    (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
  }
  
  const resp = await fetch(settings.baseUrl + path, options);
  const msg = await resp.json() as ApiResponse<T>;
  
  if (msg.status === 410) {
    tokenStorage.removeItem('sessionToken');
  }
  if (msg.meta?.session_token) {
    tokenStorage.setItem('sessionToken', msg.meta.session_token);
  }
  if ([401, 410].includes(msg.status) || (msg.status === 200 && msg.meta?.is_authenticated)) {
    const event = new CustomEvent('allauth.auth.change', { detail: msg });
    document.dispatchEvent(event);
  }
  return msg;
}

export async function login(data: Record<string, any>): Promise<ApiResponse> {
  return await request('POST', URLs.LOGIN, data);
}

export async function reauthenticate(data: Record<string, any>): Promise<ApiResponse> {
  return await request('POST', URLs.REAUTHENTICATE, data);
}

export async function logout(): Promise<ApiResponse> {
  return await request('DELETE', URLs.SESSION);
}

export async function signUp(data: Record<string, any>): Promise<ApiResponse> {
  return await request('POST', URLs.SIGNUP, data);
}

export async function signUpByPasskey(data: Record<string, any>): Promise<ApiResponse> {
  return await request('POST', URLs.SIGNUP_WEBAUTHN, data);
}

export async function providerSignup(data: Record<string, any>): Promise<ApiResponse> {
  return await request('POST', URLs.PROVIDER_SIGNUP, data);
}

export async function getProviderAccounts(): Promise<ApiResponse> {
  return await request('GET', URLs.PROVIDERS);
}

export async function disconnectProviderAccount(providerId: string, accountUid: string): Promise<ApiResponse> {
  return await request('DELETE', URLs.PROVIDERS, { provider: providerId, account: accountUid });
}

export async function requestPasswordReset(email: string): Promise<ApiResponse> {
  return await request('POST', URLs.REQUEST_PASSWORD_RESET, { email });
}

export async function requestLoginCode(email: string): Promise<ApiResponse> {
  return await request('POST', URLs.REQUEST_LOGIN_CODE, { email });
}

export async function confirmLoginCode(code: string): Promise<ApiResponse> {
  return await request('POST', URLs.CONFIRM_LOGIN_CODE, { code });
}

export async function getEmailVerification(key: string): Promise<ApiResponse> {
  return await request('GET', URLs.VERIFY_EMAIL, undefined, { 'X-Email-Verification-Key': key });
}

export async function getEmailAddresses(): Promise<ApiResponse> {
  return await request('GET', URLs.EMAIL);
}

export async function getSessions(): Promise<ApiResponse> {
  return await request('GET', URLs.SESSIONS);
}

export async function endSessions(ids: string[]): Promise<ApiResponse> {
  return await request('DELETE', URLs.SESSIONS, { sessions: ids });
}

export async function getAuthenticators(): Promise<ApiResponse> {
  return await request('GET', URLs.AUTHENTICATORS);
}

export async function getTOTPAuthenticator(): Promise<ApiResponse> {
  return await request('GET', URLs.TOTP_AUTHENTICATOR);
}

export async function mfaAuthenticate(code: string): Promise<ApiResponse> {
  return await request('POST', URLs.MFA_AUTHENTICATE, { code });
}

export async function mfaReauthenticate(code: string): Promise<ApiResponse> {
  return await request('POST', URLs.MFA_REAUTHENTICATE, { code });
}

export async function mfaTrust(trust: boolean): Promise<ApiResponse> {
  return await request('POST', URLs.MFA_TRUST, { trust });
}

export async function activateTOTPAuthenticator(code: string): Promise<ApiResponse> {
  return await request('POST', URLs.TOTP_AUTHENTICATOR, { code });
}

export async function deactivateTOTPAuthenticator(): Promise<ApiResponse> {
  return await request('DELETE', URLs.TOTP_AUTHENTICATOR);
}

export async function getRecoveryCodes(): Promise<ApiResponse> {
  return await request('GET', URLs.RECOVERY_CODES);
}

export async function generateRecoveryCodes(): Promise<ApiResponse> {
  return await request('POST', URLs.RECOVERY_CODES);
}

export async function getConfig(): Promise<ApiResponse> {
  return await request('GET', URLs.CONFIG);
}

export async function addEmail(email: string): Promise<ApiResponse> {
  return await request('POST', URLs.EMAIL, { email });
}

export async function deleteEmail(email: string): Promise<ApiResponse> {
  return await request('DELETE', URLs.EMAIL, { email });
}

export async function markEmailAsPrimary(email: string): Promise<ApiResponse> {
  return await request('PATCH', URLs.EMAIL, { email, primary: true });
}

export async function requestEmailVerification(email: string): Promise<ApiResponse> {
  return await request('PUT', URLs.EMAIL, { email });
}

export async function verifyEmail(key: string): Promise<ApiResponse> {
  return await request('POST', URLs.VERIFY_EMAIL, { key });
}

export async function getPasswordReset(key: string): Promise<ApiResponse> {
  return await request('GET', URLs.RESET_PASSWORD, undefined, { 'X-Password-Reset-Key': key });
}

export async function resetPassword(data: Record<string, any>): Promise<ApiResponse> {
  return await request('POST', URLs.RESET_PASSWORD, data);
}

export async function changePassword(data: Record<string, any>): Promise<ApiResponse> {
  return await request('POST', URLs.CHANGE_PASSWORD, data);
}

export async function getAuth(): Promise<ApiResponse> {
  return await request('GET', URLs.SESSION);
}

export async function authenticateByToken(
  providerId: string, 
  token: string, 
  process: AuthProcessType = AuthProcess.LOGIN
): Promise<ApiResponse> {
  return await request('POST', URLs.PROVIDER_TOKEN, {
    provider: providerId,
    token,
    process
  });
}

export function redirectToProvider(
  providerId: string, 
  callbackURL: string, 
  process: AuthProcessType = AuthProcess.LOGIN
): void {
  if (typeof window === 'undefined') {
    console.error('redirectToProvider ne peut être utilisé que côté client');
    return;
  }
  
  postForm(URLs.REDIRECT_TO_PROVIDER, {
    provider: providerId,
    process,
    callback_url: window.location.protocol + '//' + window.location.host + callbackURL,
    csrfmiddlewaretoken: getCSRFToken() || ''
  });
}

export async function getWebAuthnCreateOptions(passwordless?: boolean): Promise<ApiResponse> {
  let url = URLs.WEBAUTHN_AUTHENTICATOR;
  if (passwordless) {
    url += '?passwordless';
  }
  return await request('GET', url);
}

export async function getWebAuthnCreateOptionsAtSignup(): Promise<ApiResponse> {
  return await request('GET', URLs.SIGNUP_WEBAUTHN);
}

export async function addWebAuthnCredential(name: string, credential: any): Promise<ApiResponse> {
  return await request('POST', URLs.WEBAUTHN_AUTHENTICATOR, {
    name,
    credential
  });
}

export async function signupWebAuthnCredential(name: string, credential: any): Promise<ApiResponse> {
  return await request('PUT', URLs.SIGNUP_WEBAUTHN, {
    name,
    credential
  });
}

export async function deleteWebAuthnCredential(ids: string[]): Promise<ApiResponse> {
  return await request('DELETE', URLs.WEBAUTHN_AUTHENTICATOR, { authenticators: ids });
}

export async function updateWebAuthnCredential(id: string, data: Record<string, any>): Promise<ApiResponse> {
  return await request('PUT', URLs.WEBAUTHN_AUTHENTICATOR, { id, ...data });
}

export async function getWebAuthnRequestOptionsForReauthentication(): Promise<ApiResponse> {
  return await request('GET', URLs.REAUTHENTICATE_WEBAUTHN);
}

export async function reauthenticateUsingWebAuthn(credential: any): Promise<ApiResponse> {
  return await request('POST', URLs.REAUTHENTICATE_WEBAUTHN, { credential });
}

export async function authenticateUsingWebAuthn(credential: any): Promise<ApiResponse> {
  return await request('POST', URLs.AUTHENTICATE_WEBAUTHN, { credential });
}

export async function loginUsingWebAuthn(credential: any): Promise<ApiResponse> {
  return await request('POST', URLs.LOGIN_WEBAUTHN, { credential });
}

export async function getWebAuthnRequestOptionsForLogin(): Promise<ApiResponse> {
  return await request('GET', URLs.LOGIN_WEBAUTHN);
}

export async function getWebAuthnRequestOptionsForAuthentication(): Promise<ApiResponse> {
  return await request('GET', URLs.AUTHENTICATE_WEBAUTHN);
}

export function setup(client: ClientType, baseUrl: string, withCredentials: boolean): void {
  settings.client = client;
  settings.baseUrl = baseUrl;
  settings.withCredentials = withCredentials;
}
