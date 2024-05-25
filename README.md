# sieve_cache

[SIEVE Cache]((https://cachemon.github.io/SIEVE-website) for Crystal lang

[API DOC](https://lost22git.github.io/sieve_cache.cr)

## Installation

1. Add the dependency to your `shard.yml`:

   ```yaml
   dependencies:
     sieve_cache:
       github: lost22git/sieve_cache.cr
   ```

2. Run `shards install`

## Usage

```crystal
require "sieve_cache"

cache = SieveCache::Cache(String,String).new(2)

cache["koo"] = "car"
cache["foo"] = "bar"
cache["zoo"] = "baz"

p! cache.cap # => 2
p! cache.len # => 2

p! cache["koo"]? # => nil, koo is evicted
p! cache["foo"]? # => "bar"
p! cache["zoo"]? # => "baz"

begin
    cache["koo"] 
rescue ex : KeyError
    # ...
end

cache.del("foo")
p! cache.has?("foo") # => false

p! cache.get("foo", "bar") # => "bar"
p! cache.has?("foo") # => false

p! cache.get_or_set("foo", "bar") # => "bar"
p! cache.has?("foo") # => true

cache.clear
p! cache.len # => 0
```


## Development

### Run tests

```sh
just test
```

### Run bench

```sh
just bench bench/bench1.cr
```

## Contributing

1. Fork it (<https://github.com/lost22git/sieve_cache.cr/fork>)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Contributors

- [lost](https://github.com/lost22git) - creator and maintainer
