started on Friday at ~6pm, ended on sunday night ~midnight.

Spent most of my time getting the app to make the API calls in redux; however, I couldn't get redux to stop and wait for the axios calls to finish before setting state in the actual component using that information, so I ended up making those calls in the components themselves rather than in redux. This was my main issue.

Also had a bit of a problem knowing how to pass props using react-router, I figured out as much as I needed in order to grab those for the 'current' 10 beers that were pulled, and the pages breaking on later paginated pages is mostly due to my redux problem above. I could've done it without redux, but then again, I didn't really understand how to pass props using react-router.