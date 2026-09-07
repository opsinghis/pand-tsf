// Vercel Edge Middleware — HTTP Basic Auth for the DEPLOYED site only.
//
// Why this file: it runs on Vercel's edge, in front of every request. Vite's
// local dev server (`npm run dev`) does NOT execute it, so local browsing stays
// password-free while the Vercel URL prompts for a username/password.
//
// Setup (one time):
//   Vercel → Project → Settings → Environment Variables → add for "Production"
//   (and "Preview" if you share preview links):
//       BASIC_AUTH_USER = <the username you'll give reviewers>
//       BASIC_AUTH_PASS = <the password you'll give reviewers>
//   Then redeploy (env-var changes only take effect on a new deployment).
//
// To change/rotate the password later: edit the env var and redeploy.

export const config = {
  // Protect every route except Vercel's internal analytics beacon.
  matcher: '/((?!_vercel/).*)',
};

export default function middleware(request: Request): Response | undefined {
  const USER = process.env.BASIC_AUTH_USER;
  const PASS = process.env.BASIC_AUTH_PASS;

  // If credentials aren't configured yet, don't lock everyone out — pass through.
  if (!USER || !PASS) return;

  const header = request.headers.get('authorization');
  if (header && header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice('Basic '.length));
      const sep = decoded.indexOf(':');
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1); // tolerate ':' inside the password
      if (user === USER && pass === PASS) {
        return; // authenticated → let the request continue to the site
      }
    } catch {
      // malformed header → fall through to the 401 challenge
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate':
        'Basic realm="Pandora TS&F — Alternative Approach", charset="UTF-8"',
    },
  });
}
