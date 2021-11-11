import createAuth0Client from "@auth0/auth0-spa-js";

let cachedClient = null;

export async function useAuth0() {
  if (cachedClient == null) {
    const response = await fetch("/api/oauth/config");
    const configuration = await response.json();
    cachedClient = await createAuth0Client(configuration);
  }

  return cachedClient;
}

export async function loginWithRedirect(event) {
  event.preventDefault();
  const auth0 = await useAuth0();
  await auth0.loginWithRedirect();
}
