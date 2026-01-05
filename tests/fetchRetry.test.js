const  retryFetch = require("../scripts/fetchRetry.js")

global.fetch = jest.fn();

test("simulating Network error of client, catch block", async () => {
    fetch.mockRejectedValue(new Error("Network error"));
    await expect(retryFetch("https://test.com", 2))
        .rejects
        .toThrow("Network error");

    expect(fetch).toHaveBeenCalledTimes(3);

});


beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    fetch.mockClear();
  });
  afterEach(() => {
    console.error.mockRestore();
  });


test("Response from Server", async () => {
    
    fetch
        .mockResolvedValueOnce({ ok: false, status: 500 })
        .mockResolvedValueOnce({ ok: false, status: 404 })
        .mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({name: "bulbasaur"})
    });

    const result = await retryFetch("https://pokeapi.co/api/v2/pokemon/1", 2);

    expect(result).toEqual({name: "bulbasaur"});
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(console.error).toHaveBeenNthCalledWith(1, "500 - Retry left:  2");
    expect(console.error).toHaveBeenNthCalledWith(2, "404 - Retry left:  1");
});