# lib/all

This code can be used on EITHER the server OR the client.

Take care to only import functions that are available on both. Stuff that comes from `next` or `react` is fine, but stuff that comes from node modules like `fs` will cause compilation errors.
