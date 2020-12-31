<p>
  <a href="https://github.com/ueokande/setup-geckodriver/actions"><img alt="typescript-action status" src="https://github.com/ueokande/setup-geckodriver/workflows/build-test/badge.svg"></a>
</p>

# setup-geckodriver

This action sets by Geckodriver for use in actions by:

- downloading and caching a version of Geckodriver by version and add to PATH

## Usage

See [action.yml](action.yml)

Basic usage:

```yaml
steps:
  - uses: ueokande/setup-geckodriver@latest
  - run: geckodriver --version
```

## License

[MIT](LICENSE)
