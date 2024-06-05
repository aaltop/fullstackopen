```mermaid

    sequenceDiagram

        participant browser
        participant server

        browser->>server: GET */spa
        Note right of browser: * is a stand-in for whatever the URL before the resource location happens to be
        activate server
        server-->>browser: HTML document
        deactivate server

        browser->>server: GET */main.css
        activate server
        server-->>browser: the css file
        deactivate server

        browser->>server: GET */spa.js
        activate server
        server-->>browser: the JavaScript file
        deactivate server

        Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

        browser->>server: GET */data.json
        activate server
        server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
        deactivate server

        Note right of browser: The browser executes the callback function that renders the notes

```
