# Problem 0.6: New note in Single page app diagram

Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

## Answer

The diagram is in the file `diagram.md`. In this case, the server
might not even partake in the process, as the contents of the view
are updated locally. Still, the contents are also send to the server
so that it can update its datasets and presumably serve the updated
notes list to other requesters as well.