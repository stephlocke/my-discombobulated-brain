"""Read Hugo settings from config.toml and emit GitHub Actions outputs."""

import os
import tomllib

try:
    with open("config.toml", "rb") as config_file:
        config = tomllib.load(config_file)
except OSError as error:
    raise SystemExit(f"Failed to read config.toml: {error}") from error

hugo_config = config.get("params", {}).get("hugo", {})
version = hugo_config.get("version")
extended = hugo_config.get("extended")

if not isinstance(version, str) or not version.strip():
    raise SystemExit("config.toml params.hugo.version must be a non-empty string")
if not isinstance(extended, bool):
    raise SystemExit("config.toml params.hugo.extended must be true or false")

with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as github_output:
    github_output.write(f"version={version.strip()}\n")
    github_output.write(f"extended={'true' if extended else 'false'}\n")
