# Preview and deployment

## No installation or build

The repository root contains the finished website. There is no package manager,
framework, generator, build command or runtime service. All fonts, images, CSS
and JavaScript are local files. Do not run `npm install`.

Open `index.html` in a browser to read the site. For an HTTP preview, use any
static web server. If Python 3 is already available:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Visit `http://127.0.0.1:8080`. Stop the server with Ctrl+C.
Python is an optional preview tool, not a website dependency.

## Deploy manually on GitHub Pages

No deployment workflow is included. Creating or pushing this repository does
not enable Pages, change DNS or publish the website.

1. Review and merge the website pull request when ready.
2. In the repository's **Settings > Pages**, choose **Deploy from a branch**.
3. Select `main` and `/(root)`, then save.
4. Set the custom domain to the hostname in the root `CNAME` file.
5. Configure DNS for that hostname, following
   [GitHub's custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
6. Enable HTTPS when GitHub has provisioned the certificate.

The company apex domain needs the apex-domain DNS setup. Branch subdomains
normally use a CNAME to their organization's `ORG.github.io` hostname, not a
repository path. Confirm the current instructions in GitHub's docs.

`.nojekyll` keeps the supplied files unchanged. `CNAME`, `robots.txt` and
`sitemap.xml` already describe the intended hostname. Asset and internal-page
links are relative, so the content also works under a Pages repository path.
Canonical and social-preview URLs intentionally use the final custom domain.

Deploy each site independently. Links to other Synctune subdomains will work
when their owners deploy those sites. Denote, Open Playlist and Moguri are
external project links; this repository does not publish their websites.

## Other static hosts

Publish the repository root as static files. Leave the install and build
commands empty. The site needs no environment variables, API keys, rewrites,
server functions or network API.

`404.html` is a standalone fallback. GitHub Pages uses it for missing paths;
on another host, select it as the not-found page if required.
