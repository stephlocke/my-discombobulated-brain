"""Fail the build if any event's end_time is before its start_time.

Sveltia CMS has no built-in way to validate one field against another (see
the datetime fields in layouts/admin/single.cmsconfig.yml), so this is a
build-time backstop rather than in-editor validation.
"""

import datetime
import pathlib
import re
import sys

EVENTS_DIR = pathlib.Path("content/events")
FIELD_PATTERN = re.compile(r'^(start_time|end_time):\s*"?([0-9T:\-]+)"?\s*$')

index_files = sorted(EVENTS_DIR.glob("*/index.md"))
errors = []

for index_file in index_files:
    text = index_file.read_text(encoding="utf-8")
    if not text.startswith("---"):
        continue
    front_matter = text.split("---", 2)[1]

    values = {}
    for line in front_matter.splitlines():
        match = FIELD_PATTERN.match(line.strip())
        if match:
            values[match.group(1)] = match.group(2)

    if "start_time" not in values or "end_time" not in values:
        continue

    try:
        start = datetime.datetime.fromisoformat(values["start_time"])
        end = datetime.datetime.fromisoformat(values["end_time"])
    except ValueError as error:
        errors.append(f"{index_file}: could not parse start_time/end_time ({error})")
        continue

    if end < start:
        errors.append(
            f"{index_file}: end_time ({values['end_time']}) is before "
            f"start_time ({values['start_time']})"
        )

if errors:
    print("Event date validation failed:\n")
    for error in errors:
        print(f"  - {error}")
    sys.exit(1)

print(f"Checked {len(index_files)} event(s) - all end_time values are after start_time.")
