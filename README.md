![build-test](https://github.com/browser-actions/setup-geckodriver/workflows/build-test/badge.svg)

# setup-geckodriver

This action sets by Geckodriver for use in actions by:

- downloading and caching a version of Geckodriver by version and add to PATH

## Usage

Valid inputs:
* `geckodriver-version`: Specific version of geckodriver to use.
* `token`: GitHub access token. Used to avoid rate limits.

Basic usage:

```yaml
steps:
  - uses: browser-actions/setup-geckodriver@latest
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
  - run: geckodriver --version
```

## License

[MIT](LICENSE)
