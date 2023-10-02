class FetchJsonError extends Error {
  json: any;
}

async function fetchJson(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.status == 401) {
    if (location) {
      const origin = location.origin;
      location.replace(`${origin}/logout`);
    } else {
      throw new Error('ERR_REFRESH_TOKEN');
    }
    return;
  }

  if (response.status >= 400) {
    let error;
    try {
      const json = await response.json();
      error = new FetchJsonError(
        // prettier-ignore
        `\n${JSON.stringify(input)}\n${response.status}, ${response.statusText}\n${JSON.stringify(json)}\n`
      );
      error.json = json;
    } catch (ex) {
      error = new FetchJsonError(
        // prettier-ignore
        `\n${JSON.stringify(input)}\n${response.status}, ${response.statusText}\n\n`
      );
    }
    throw error;
  }

  const json = await response.json();

  return json;
}

export default fetchJson;
