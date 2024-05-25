set windows-shell := [ "pwsh", "-NoLogo", "-NoProfile", "-Command" ]

_default:
 @just --list

clean:
  crystal clear_cache

[windows]
check *flags:
  ./bin/ameba.exe {{ flags }}

[unix]
check *flags:
  ./bin/ameba {{ flags }}

docs *flags:
  crystal docs {{ flags }}

test *spec_files_or_flags:
  crystal spec --progress {{ spec_files_or_flags }}

bench bench_file *flags:
  crystal run --release --progress {{ flags }} {{ bench_file }}
