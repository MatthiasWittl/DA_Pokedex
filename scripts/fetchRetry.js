

  async function retryFetch(url, retries = 3) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`${response.status} - Retry left:  ${retries}`);
            if (retries > 0) {
                return retryFetch(url, retries - 1);
            }
            throw new Error(`Request failed with ${response.status}`)
        }
        return await response.json();
    } catch (error) {
      if (retries > 0) {
        return retryFetch(url, retries - 1);
    }
    throw error; 

    }
}

module.exports = retryFetch;


/* catch block fängt Netzwerk Fehler ab. */