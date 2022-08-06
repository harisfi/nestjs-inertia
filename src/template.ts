const viewTemplate = (pageString: string) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/dist/css/app.css" />
    <script defer type="module" src="/dist/js/app.js"></script>
</head>

<!-- The Inertia page object -->
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="app" data-page='${pageString}'></div>
</body>

</html>`;

export default viewTemplate;