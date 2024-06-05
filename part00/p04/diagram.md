```mermaid

    sequenceDiagram

        participant browser
        participant server

        browser->>server: POST */new_note
        Note right of browser: * is a stand-in for whatever the URL before the resource location happens to be
        activate server
        Note right of browser: The server handles the request, creating and setting the new item in the notes list
        and sending back a redirect
        server->>browser: Response 302 Found
        deactivate server

        Note right of browser: From here, the steps are the same as when loading the */notes page
        in the first place.

        browser->>server: GET */notes
        activate server
        server-->>browser: HTML document
        deactivate server

        browser->>server: GET */main.css
        activate server
        server-->>browser: the css file
        deactivate server

        browser->>server: GET */main.js
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