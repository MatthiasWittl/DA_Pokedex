async function retryFetch(url, retries = 3) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            //console.error(`${response.status} - Retry left:  ${retries}`);
            if (response.status >= 500 && retries > 0) {
                return retryFetch(url, retries - 1);
            }
            //throw new Error(`Request failed width ${response.status}`);
        }
        return await response.json();
    } catch (error) {
      if (retries > 0 && error instanceof TypeError) {
        return retryFetch(url, retries - 1);
    }
}}

