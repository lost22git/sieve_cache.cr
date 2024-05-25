crystal_doc_search_index_callback({"repository_name":"sieve_cache","body":"# sieve_cache\n\n[SIEVE Cache](https://cachemon.github.io/SIEVE-website) for Crystal lang\n\n[API DOC](https://lost22git.github.io/sieve_cache.cr)\n\n## Installation\n\n1. Add the dependency to your `shard.yml`:\n\n   ```yaml\n   dependencies:\n     sieve_cache:\n       github: lost22git/sieve_cache.cr\n   ```\n\n2. Run `shards install`\n\n## Usage\n\n```crystal\nrequire \"sieve_cache\"\n\ncache = SieveCache::Cache(String,String).new(2)\n\ncache[\"koo\"] = \"car\"\ncache[\"foo\"] = \"bar\"\ncache[\"zoo\"] = \"baz\"\n\np! cache.cap # => 2\np! cache.len # => 2\n\np! cache[\"koo\"]? # => nil, koo is evicted\np! cache[\"foo\"]? # => \"bar\"\np! cache[\"zoo\"]? # => \"baz\"\n\nbegin\n    cache[\"koo\"] \nrescue ex : KeyError\n    # ...\nend\n\ncache.del(\"foo\")\np! cache.has?(\"foo\") # => false\n\np! cache.get(\"foo\", \"bar\") # => \"bar\"\np! cache.has?(\"foo\") # => false\n\np! cache.get_or_set(\"foo\", \"bar\") # => \"bar\"\np! cache.has?(\"foo\") # => true\n\ncache.clear\np! cache.len # => 0\n```\n\n\n## Development\n\n### Run tests\n\n```sh\njust test\n```\n\n### Run bench\n\n```sh\njust bench bench/bench1.cr\n```\n\n## Contributing\n\n1. Fork it (<https://github.com/lost22git/sieve_cache.cr/fork>)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n- [lost](https://github.com/lost22git) - creator and maintainer\n","program":{"html_id":"sieve_cache/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"locations":[],"repository_name":"sieve_cache","program":true,"enum":false,"alias":false,"const":false,"types":[{"html_id":"sieve_cache/SieveCache","path":"SieveCache.html","kind":"module","full_name":"SieveCache","name":"SieveCache","abstract":false,"locations":[{"filename":"src/sieve_cache.cr","line_number":5,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L5"}],"repository_name":"sieve_cache","program":false,"enum":false,"alias":false,"const":false,"constants":[{"id":"VERSION","name":"VERSION","value":"\"0.1.0\""}],"types":[{"html_id":"sieve_cache/SieveCache/Cache","path":"SieveCache/Cache.html","kind":"class","full_name":"SieveCache::Cache(K, V)","name":"Cache","abstract":false,"superclass":{"html_id":"sieve_cache/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"sieve_cache/SieveCache/CacheBase","kind":"module","full_name":"SieveCache::CacheBase","name":"CacheBase"},{"html_id":"sieve_cache/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"sieve_cache/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/sieve_cache.cr","line_number":187,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L187"}],"repository_name":"sieve_cache","program":false,"enum":false,"alias":false,"const":false,"included_modules":[{"html_id":"sieve_cache/SieveCache/CacheBase","kind":"module","full_name":"SieveCache::CacheBase","name":"CacheBase"}],"namespace":{"html_id":"sieve_cache/SieveCache","kind":"module","full_name":"SieveCache","name":"SieveCache"},"constructors":[{"html_id":"new(cap:UInt32)-class-method","name":"new","doc":"Initialize cache with given capacity\n\n```\ncache = Cache(String, String).new(10)\n```\n","summary":"<p>Initialize cache with given capacity</p>","abstract":false,"args":[{"name":"cap","external_name":"cap","restriction":"::UInt32"}],"args_string":"(cap : UInt32)","args_html":"(cap : UInt32)","location":{"filename":"src/sieve_cache.cr","line_number":205,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L205"},"def":{"name":"new","args":[{"name":"cap","external_name":"cap","restriction":"::UInt32"}],"visibility":"Public","body":"_ = Cache(K, V).allocate\n_.initialize(cap)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"clear-instance-method","name":"clear","doc":"Clear cache\n\n```\ncache.clear\np! cache.len # => 0\n```\n","summary":"<p>Clear cache</p>","abstract":false,"location":{"filename":"src/sieve_cache.cr","line_number":221,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L221"},"def":{"name":"clear","visibility":"Public","body":"store_clear\n@head = @tail = @cursor = nil\n@len = 0\n"}},{"html_id":"del(key:K,&)-instance-method","name":"del","doc":"Delete value by key, call the block if key is not found\n\n```\ndeleted_value = cache.del(\"foo\") { nil }\n```\n","summary":"<p>Delete value by key, call the block if key is not found</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K, &)","args_html":"(key : K, &)","location":{"filename":"src/sieve_cache.cr","line_number":262,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L262"},"def":{"name":"del","args":[{"name":"key","external_name":"key","restriction":"K"}],"yields":1,"block_arity":1,"visibility":"Public","body":"node = store_get?(key)\nif node\n  store_del(node.key)\n  list_del(node)\n  node.value\nelse\n  yield key\nend\n"}},{"html_id":"get(key:K,&)-instance-method","name":"get","doc":"Get value by key, call the block if key is not found\n\n```\nvalue = cache.get(\"foo\") { |k| raise \"Key: #{k} not found\" }\n```\n","summary":"<p>Get value by key, call the block if key is not found</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K, &)","args_html":"(key : K, &)","location":{"filename":"src/sieve_cache.cr","line_number":243,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L243"},"def":{"name":"get","args":[{"name":"key","external_name":"key","restriction":"K"}],"yields":1,"block_arity":1,"visibility":"Public","body":"node = store_get?(key)\nif node\n  node.visited = true\n  node.value\nelse\n  yield key\nend\n"}},{"html_id":"get_or_set(key:K,&:K->V):V-instance-method","name":"get_or_set","doc":"Get value by key, call the block to get value to set into cache if key is not found\n\n```\nvalue = cache.get_or_set(\"foo\") { |k| \"new value of key: #{k}\" }\np! value        # => \"new value of key: foo\"\np! cache[\"foo\"] # => \"new value of key: foo\"\n```\n","summary":"<p>Get value by key, call the block to get value to set into cache if key is not found</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K, & : K -> V) : V","args_html":"(key : K, & : K -> V) : V","location":{"filename":"src/sieve_cache.cr","line_number":253,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L253"},"def":{"name":"get_or_set","args":[{"name":"key","external_name":"key","restriction":"K"}],"yields":1,"block_arity":1,"block_arg":{"name":"","external_name":"","restriction":"(K -> V)"},"return_type":"V","visibility":"Public","body":"get(key) do\n  node = Node.new(key, yield key)\n  list_add(node)\n  store_set(key, node)\n  node.value\nend"}},{"html_id":"has?(key:K):Bool-instance-method","name":"has?","doc":"Check cache if has key?\n\n```\nif cache.has?(\"hello\")\n  ...\nend\n```\n","summary":"<p>Check cache if has key?</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K) : Bool","args_html":"(key : K) : Bool","location":{"filename":"src/sieve_cache.cr","line_number":227,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L227"},"def":{"name":"has?","args":[{"name":"key","external_name":"key","restriction":"K"}],"return_type":"Bool","visibility":"Public","body":"store_has?(key)"}},{"html_id":"set(key:K,value:V)-instance-method","name":"set","doc":"Set key-value to cache\n\n```\ncache.set(\"foo\", \"bar\")\ncache.set(\"foo\", \"baz\")\n```\n","summary":"<p>Set key-value to cache</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"},{"name":"value","external_name":"value","restriction":"V"}],"args_string":"(key : K, value : V)","args_html":"(key : K, value : V)","location":{"filename":"src/sieve_cache.cr","line_number":231,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L231"},"def":{"name":"set","args":[{"name":"key","external_name":"key","restriction":"K"},{"name":"value","external_name":"value","restriction":"V"}],"visibility":"Public","body":"node = store_get?(key)\nif node\n  node.value = value\n  node.visited = true\nelse\n  node = Node.new(key, value)\n  list_add(node)\n  store_set(key, node)\nend\n"}},{"html_id":"to_s-instance-method","name":"to_s","doc":"to string\n\n```\ncache = Cache(String, String).new(10)\npp! cache.to_s\n```\n","summary":"<p>to string</p>","abstract":false,"location":{"filename":"src/sieve_cache.cr","line_number":217,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L217"},"def":{"name":"to_s","visibility":"Public","body":"\"Cache(len=#{@len},cap=#{@cap},head=#{@head.try(&.to_s) || \"nil\"},tail=#{@tail.try(&.to_s) || \"nil\"},cursor=#{@cursor.try(&.to_s) || \"nil\"})\""}}]},{"html_id":"sieve_cache/SieveCache/CacheBase","path":"SieveCache/CacheBase.html","kind":"module","full_name":"SieveCache::CacheBase(K, V)","name":"CacheBase","abstract":false,"locations":[{"filename":"src/sieve_cache.cr","line_number":24,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L24"}],"repository_name":"sieve_cache","program":false,"enum":false,"alias":false,"const":false,"including_types":[{"html_id":"sieve_cache/SieveCache/Cache","kind":"class","full_name":"SieveCache::Cache(K, V)","name":"Cache"}],"namespace":{"html_id":"sieve_cache/SieveCache","kind":"module","full_name":"SieveCache","name":"SieveCache"},"instance_methods":[{"html_id":"[](key:K)-instance-method","name":"[]","doc":"Get value by key, raise KeyError if key is not found\n\n```\nvalue = cache[\"foo\"]\n```\n","summary":"<p>Get value by key, raise KeyError if key is not found</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K)","args_html":"(key : K)","location":{"filename":"src/sieve_cache.cr","line_number":182,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L182"},"def":{"name":"[]","args":[{"name":"key","external_name":"key","restriction":"K"}],"visibility":"Public","body":"get(key) do\n  raise(KeyError.new(\"Key: `#{key}` not found\"))\nend"}},{"html_id":"[]=(key:K,value:V)-instance-method","name":"[]=","doc":"Set key-value into cache\n\n```\ncache[\"foo\"] = \"bar\"\ncache[\"foo\"] = \"baz\"\n```\n","summary":"<p>Set key-value into cache</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"},{"name":"value","external_name":"value","restriction":"V"}],"args_string":"(key : K, value : V)","args_html":"(key : K, value : V)","location":{"filename":"src/sieve_cache.cr","line_number":162,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L162"},"def":{"name":"[]=","args":[{"name":"key","external_name":"key","restriction":"K"},{"name":"value","external_name":"value","restriction":"V"}],"visibility":"Public","body":"set(key, value)"}},{"html_id":"[]?(key:K):V|Nil-instance-method","name":"[]?","doc":"Get value by key, return nil if key is not found\n\n```\nvalue = cache[\"foo\"]?\n```\n","summary":"<p>Get value by key, return nil if key is not found</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K) : V | Nil","args_html":"(key : K) : V | Nil","location":{"filename":"src/sieve_cache.cr","line_number":172,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L172"},"def":{"name":"[]?","args":[{"name":"key","external_name":"key","restriction":"K"}],"return_type":"V | ::Nil","visibility":"Public","body":"get(key) do\n  nil\nend"}},{"html_id":"cap:UInt32-instance-method","name":"cap","doc":"Get the capacity of the cache\n\n```\np! cache.cap\n```\n","summary":"<p>Get the capacity of the cache</p>","abstract":false,"location":{"filename":"src/sieve_cache.cr","line_number":65,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L65"},"def":{"name":"cap","return_type":"UInt32","visibility":"Public","body":"@cap"}},{"html_id":"clear-instance-method","name":"clear","doc":"Clear cache\n\n```\ncache.clear\np! cache.len # => 0\n```\n","summary":"<p>Clear cache</p>","abstract":true,"location":{"filename":"src/sieve_cache.cr","line_number":76,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L76"},"def":{"name":"clear","visibility":"Public","body":""}},{"html_id":"del(key:K,&:K->)-instance-method","name":"del","doc":"Delete value by key, call the block if key is not found\n\n```\ndeleted_value = cache.del(\"foo\") { nil }\n```\n","summary":"<p>Delete value by key, call the block if key is not found</p>","abstract":true,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K, & : K -> )","args_html":"(key : K, & : K -> )","location":{"filename":"src/sieve_cache.cr","line_number":121,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L121"},"def":{"name":"del","args":[{"name":"key","external_name":"key","restriction":"K"}],"yields":1,"block_arity":1,"block_arg":{"name":"","external_name":"","restriction":"(K ->)"},"visibility":"Public","body":""}},{"html_id":"del(key:K):V|Nil-instance-method","name":"del","doc":"Delete value by key, return deleted value or nil (if key is not found)\n\n```\ndeleted_value_or_nil = cache.del(\"foo\")\n```\n","summary":"<p>Delete value by key, return deleted value or nil (if key is not found)</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K) : V | Nil","args_html":"(key : K) : V | Nil","location":{"filename":"src/sieve_cache.cr","line_number":151,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L151"},"def":{"name":"del","args":[{"name":"key","external_name":"key","restriction":"K"}],"return_type":"V | ::Nil","visibility":"Public","body":"del(key) do\n  nil\nend"}},{"html_id":"empty?:Bool-instance-method","name":"empty?","doc":"Check cache is empty?\n\n```\nif cache.empty?\n  ...\nend\n```\n","summary":"<p>Check cache is empty?</p>","abstract":false,"location":{"filename":"src/sieve_cache.cr","line_number":45,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L45"},"def":{"name":"empty?","return_type":"Bool","visibility":"Public","body":"@len == 0"}},{"html_id":"full?:Bool-instance-method","name":"full?","doc":"Check cache is full?\n\n```\nif cache.full?\n  ...\nend\n```\n","summary":"<p>Check cache is full?</p>","abstract":false,"location":{"filename":"src/sieve_cache.cr","line_number":33,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L33"},"def":{"name":"full?","return_type":"Bool","visibility":"Public","body":"@len == @cap"}},{"html_id":"get(key:K,&:K->)-instance-method","name":"get","doc":"Get value by key, call the block if key is not found\n\n```\nvalue = cache.get(\"foo\") { |k| raise \"Key: #{k} not found\" }\n```\n","summary":"<p>Get value by key, call the block if key is not found</p>","abstract":true,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K, & : K -> )","args_html":"(key : K, & : K -> )","location":{"filename":"src/sieve_cache.cr","line_number":103,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L103"},"def":{"name":"get","args":[{"name":"key","external_name":"key","restriction":"K"}],"yields":1,"block_arity":1,"block_arg":{"name":"","external_name":"","restriction":"(K ->)"},"visibility":"Public","body":""}},{"html_id":"get(key:K,fallback:V):V-instance-method","name":"get","doc":"Get value by key, return fallback value if key is no found\n\n```\nvalue = cache.get(\"foo\", \"bar\")\np! value # => \"bar\"\n```\n","summary":"<p>Get value by key, return fallback value if key is no found</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"},{"name":"fallback","external_name":"fallback","restriction":"V"}],"args_string":"(key : K, fallback : V) : V","args_html":"(key : K, fallback : V) : V","location":{"filename":"src/sieve_cache.cr","line_number":130,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L130"},"def":{"name":"get","args":[{"name":"key","external_name":"key","restriction":"K"},{"name":"fallback","external_name":"fallback","restriction":"V"}],"return_type":"V","visibility":"Public","body":"get(key) do\n  fallback\nend"}},{"html_id":"get_or_set(key:K,&:K->V):V-instance-method","name":"get_or_set","doc":"Get value by key, call the block to get value to set into cache if key is not found\n\n```\nvalue = cache.get_or_set(\"foo\") { |k| \"new value of key: #{k}\" }\np! value        # => \"new value of key: foo\"\np! cache[\"foo\"] # => \"new value of key: foo\"\n```\n","summary":"<p>Get value by key, call the block to get value to set into cache if key is not found</p>","abstract":true,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K, & : K -> V) : V","args_html":"(key : K, & : K -> V) : V","location":{"filename":"src/sieve_cache.cr","line_number":113,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L113"},"def":{"name":"get_or_set","args":[{"name":"key","external_name":"key","restriction":"K"}],"yields":1,"block_arity":1,"block_arg":{"name":"","external_name":"","restriction":"(K -> V)"},"return_type":"V","visibility":"Public","body":""}},{"html_id":"get_or_set(key:K,value:V):V-instance-method","name":"get_or_set","doc":"Get value by key, set key-value into cache if key is not found\n\n```\nvalue = cache.get_or_set(\"foo\", \"bar\")\np! value # => \"bar\"\n```\n","summary":"<p>Get value by key, set key-value into cache if key is not found</p>","abstract":false,"args":[{"name":"key","external_name":"key","restriction":"K"},{"name":"value","external_name":"value","restriction":"V"}],"args_string":"(key : K, value : V) : V","args_html":"(key : K, value : V) : V","location":{"filename":"src/sieve_cache.cr","line_number":141,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L141"},"def":{"name":"get_or_set","args":[{"name":"key","external_name":"key","restriction":"K"},{"name":"value","external_name":"value","restriction":"V"}],"return_type":"V","visibility":"Public","body":"get_or_set(key) do\n  value\nend"}},{"html_id":"has?(key:K):Bool-instance-method","name":"has?","doc":"Check cache if has key?\n\n```\nif cache.has?(\"hello\")\n  ...\nend\n```\n","summary":"<p>Check cache if has key?</p>","abstract":true,"args":[{"name":"key","external_name":"key","restriction":"K"}],"args_string":"(key : K) : Bool","args_html":"(key : K) : Bool","location":{"filename":"src/sieve_cache.cr","line_number":86,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L86"},"def":{"name":"has?","args":[{"name":"key","external_name":"key","restriction":"K"}],"return_type":"Bool","visibility":"Public","body":""}},{"html_id":"len:UInt32-instance-method","name":"len","doc":"Get the length of the cache\n\n```\np! cache.len\n```\n","summary":"<p>Get the length of the cache</p>","abstract":false,"location":{"filename":"src/sieve_cache.cr","line_number":55,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L55"},"def":{"name":"len","return_type":"UInt32","visibility":"Public","body":"@len"}},{"html_id":"set(key:K,value:V)-instance-method","name":"set","doc":"Set key-value to cache\n\n```\ncache.set(\"foo\", \"bar\")\ncache.set(\"foo\", \"baz\")\n```\n","summary":"<p>Set key-value to cache</p>","abstract":true,"args":[{"name":"key","external_name":"key","restriction":"K"},{"name":"value","external_name":"value","restriction":"V"}],"args_string":"(key : K, value : V)","args_html":"(key : K, value : V)","location":{"filename":"src/sieve_cache.cr","line_number":95,"url":"https://github.com/lost22git/sieve_cache.cr/blob/c22cc2fb1956145a65545d615237059e9b7a1c4a/src/sieve_cache.cr#L95"},"def":{"name":"set","args":[{"name":"key","external_name":"key","restriction":"K"},{"name":"value","external_name":"value","restriction":"V"}],"visibility":"Public","body":""}}]}]}]}})