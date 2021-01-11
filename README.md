![build-test](https://github.com/browser-actions/setup-geckodriver/workflows/build-test/badge.svg)

# setup-geckodriver

This action sets by Geckodriver for use in actions by:

- downloading and caching a version of Geckodriver by version and add to PATH

## Usage

See [action.yml](action.yml)

Basic usage:

```yaml
steps:
  - uses: browser-actions/setup-geckodriver@latest
  - run: geckodriver --version
```

## License

[MIT](LICENSE)
