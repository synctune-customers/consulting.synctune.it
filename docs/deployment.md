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

## Set up GitHub Pages

Complete this once in each website repository. The workflow does not enable
Pages, change the repository's Pages source or configure DNS for you.

1. In **Settings > Pages**, set **Source** to **GitHub Actions**.
2. Set the custom domain to the hostname in the root `CNAME` file.
3. Configure DNS for that hostname, following
   [GitHub's custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
4. Review and merge the website pull request when ready. Its first deployment
   runs automatically on `main`.
5. Enable HTTPS when GitHub has provisioned the certificate.

The company apex domain needs the apex-domain DNS setup. Branch subdomains
normally use a CNAME to their organization's `ORG.github.io` hostname, not a
repository path. Confirm the current instructions in GitHub's docs.

For Actions deployments, set the custom domain in **Settings > Pages** even
though a `CNAME` file is included. The file records the intended hostname; it
does not configure that setting for you.

## Deployment workflow

`.github/workflows/pages.yml` has two jobs:

- **Package static site** copies root HTML files, `assets/`, `CNAME`,
  `.nojekyll`, `robots.txt` and `sitemap.xml` into the public artifact. It does
  not install dependencies or build the site. Repository metadata, workflow
  source, README and docs are not published.
- **Deploy GitHub Pages** deploys that artifact from the same workflow run.
  Only this job receives Pages write and OIDC permissions, and it runs only
  for `main`. The deployment URL appears on the `github-pages` environment.

Site changes and changes to this workflow trigger packaging on pull requests
targeting `main`, including drafts. PRs do not upload a deployment artifact or
deploy, and the packaging job has read-only repository permissions.

After merging, matching changes pushed to `main` package and deploy the site.
Documentation-only changes do not trigger this workflow. Older PR runs can be
canceled by newer commits on the same PR. Production deployments are serialized
without canceling the in-progress run.

Once the workflow is on `main`, redeploy manually through **Actions > Deploy
static site > Run workflow**, selecting **main**. Dispatching it on another
branch skips both jobs.

The workflow uses official GitHub actions pinned to full commit SHAs. Artifacts
expire after one day. No additional tokens or secrets are needed beyond the
standard `GITHUB_TOKEN` and GitHub's OIDC token.

The workflow does not run Jekyll. `CNAME`, `robots.txt` and `sitemap.xml` already
describe the intended hostname. Asset and internal-page links are relative,
so the content also works under a Pages repository path. Canonical and
social-preview URLs intentionally use the final custom domain.

Deploy each site independently. Links to other Synctune subdomains will work
when their owners deploy those sites. Denote, Open Playlist, Open Playlist
Engine and Moguri are external project links; this repository does not publish
their websites.

## Other static hosts

Publish the repository root as static files. Leave the install and build
commands empty. The site needs no environment variables, API keys, rewrites,
server functions or network API.

`404.html` is a standalone fallback. GitHub Pages uses it for missing paths;
on another host, select it as the not-found page if required.
