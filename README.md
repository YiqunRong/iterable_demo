# Examples for nodejs generators and streams

You can start the mock server by running `node server/mock_server.js` so that you have an endpoint use in `generators/fetchItemGenerator.js`. The file format to be used in this repository is JSONL (JSON LINE) file.

- How to construct generator from endpoit -> `generators/fetchItemGenerator.js`.

- How to combine files into a single files using nodejs Stream -> `streams/combineFiles.js`.

- How to write paginaged content from an endpoint to a single file using nodejs generator and stream -> `streams/fetchItemToFile.js`.

- How to transform data from file to write into a new file using nodejs stream -> `streams/fileToFile.js`.

- How to get items from file to write into a new file using nodejs stream -> `streams/getItemsFromFile.js`.

- How to split content from a single file to multiple files using nodejs stream -> `streams/splitFiles.js`.
