"""Convert any AVIF images under content/ to WebP before the Hugo build.

Hugo's image pipeline can't process AVIF source files, so the CMS's image
widgets are restricted to exclude it (see layouts/admin/single.cmsconfig.yml).
That restriction can't cover images dropped into markdown body fields though,
so this is a backstop: it converts any AVIF that slips through and rewrites
the page(s) referencing it, rather than letting the build fail.
"""

import pathlib
import subprocess
import sys

CONTENT_DIR = pathlib.Path("content")

avif_files = sorted({*CONTENT_DIR.rglob("*.avif"), *CONTENT_DIR.rglob("*.AVIF")})

if not avif_files:
    print("No .avif files found under content/ — nothing to convert.")
    sys.exit(0)

markdown_files = list(CONTENT_DIR.rglob("*.md"))

for avif_path in avif_files:
    webp_path = avif_path.with_suffix(".webp")
    print(f"Converting {avif_path} -> {webp_path}")

    result = subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(avif_path), str(webp_path)],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise SystemExit(f"Failed to convert {avif_path} to WebP:\n{result.stderr}")

    old_name, new_name = avif_path.name, webp_path.name
    old_name_encoded, new_name_encoded = old_name.replace(" ", "%20"), new_name.replace(" ", "%20")

    for markdown_file in markdown_files:
        text = markdown_file.read_text(encoding="utf-8")
        updated = text.replace(old_name_encoded, new_name_encoded).replace(old_name, new_name)
        if updated != text:
            markdown_file.write_text(updated, encoding="utf-8")
            print(f"  Updated reference in {markdown_file}")

    avif_path.unlink()

print(f"Converted {len(avif_files)} AVIF file(s) to WebP.")
