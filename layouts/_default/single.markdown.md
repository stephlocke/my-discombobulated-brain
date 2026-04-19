{{- /* Markdown output template for single pages.
     Rendered alongside index.html as index.md when the Markdown output
     format is enabled. Served by the Netlify edge function when a client
     sends Accept: text/markdown (or ?format=markdown).

     Outputs clean YAML front matter followed by the raw source content,
     with Hugo-added front matter stripped so only the original markdown body
     is included.
*/ -}}
---
title: {{ .Title | jsonify }}
url: {{ .Permalink }}
{{- if not .Date.IsZero }}
date: {{ .Date.Format "2006-01-02" }}
{{- end }}
{{- if not .Lastmod.IsZero }}
lastmod: {{ .Lastmod.Format "2006-01-02" }}
{{- end }}
{{- with .Description }}
description: {{ . | jsonify }}
{{- end }}
{{- with .Params.tags }}
tags: {{ . | jsonify }}
{{- end }}
{{- with .Params.categories }}
categories: {{ . | jsonify }}
{{- end }}
---

{{ .RawContent | replaceRE `(?s)\A---\n.*?\n---\n*` "" | strings.TrimLeft "\n" -}}
