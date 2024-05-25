#
#  A SIEVE CACHE IMPLEMENTATION FOR CRYSTAL LANG
#

module SieveCache
  VERSION = "0.1.0"
end

private class SieveCache::Node(K, V)
  getter key : K
  property value : V
  property? visited : Bool
  property prev : Node(K, V)?
  property next : Node(K, V)?

  def initialize(@key, @value, @visited = false, @prev = nil, @next = nil)
  end

  def to_s
    "Node(key=#{@key},value=#{@value},visited=#{@visited})"
  end
end

module SieveCache::CacheBase(K, V)
  # Check cache is full?
  #
  # ```
  # if cache.full?
  #   ...
  # end
  # ```
  #
  def full? : Bool
    @len == @cap
  end

  # Check cache is empty?
  #
  # ```
  # if cache.empty?
  #   ...
  # end
  # ```
  #
  def empty? : Bool
    @len == 0
  end

  # Get the length of the cache
  #
  # ```
  # p! cache.len
  # ```
  #
  def len : UInt32
    @len
  end

  # Get the capacity of the cache
  #
  # ```
  # p! cache.cap
  # ```
  #
  def cap : UInt32
    @cap
  end

  # Clear cache
  #
  # ```
  # cache.clear
  # p! cache.len # => 0
  # ```
  #
  abstract def clear

  # Check cache if has key?
  #
  # ```
  # if cache.has?("hello")
  #   ...
  # end
  # ```
  #
  abstract def has?(key : K) : Bool

  # Set key-value to cache
  #
  # ```
  # cache.set("foo", "bar")
  # cache.set("foo", "baz")
  # ```
  #
  abstract def set(key : K, value : V)

  # Get value by key, call the block if key is not found
  #
  # ```
  # value = cache.get("foo") { |k| raise "Key: #{k} not found" }
  # ```
  #
  abstract def get(key : K, & : K ->)

  # Get value by key, call the block to get value to set into cache if key is not found
  #
  # ```
  # value = cache.get_or_set("foo") { |k| "new value of key: #{k}" }
  # p! value        # => "new value of key: foo"
  # p! cache["foo"] # => "new value of key: foo"
  # ```
  #
  abstract def get_or_set(key : K, & : K -> V) : V

  # Delete value by key, call the block if key is not found
  #
  # ```
  # deleted_value = cache.del("foo") { nil }
  # ```
  #
  abstract def del(key : K, & : K ->)

  # Get value by key, return fallback value if key is no found
  #
  # ```
  # value = cache.get("foo", "bar")
  # p! value # => "bar"
  # ```
  #
  def get(key : K, fallback : V) : V
    get(key) { fallback }
  end

  # Get value by key, set key-value into cache if key is not found
  #
  # ```
  # value = cache.get_or_set("foo", "bar")
  # p! value # => "bar"
  # ```
  #
  def get_or_set(key : K, value : V) : V
    get_or_set(key) { value }
  end

  # Delete value by key, return deleted value or nil (if key is not found)
  #
  # ```
  # deleted_value_or_nil = cache.del("foo")
  # ```
  #
  def del(key : K) : V?
    del(key) { nil }
  end

  # Set key-value into cache
  #
  # ```
  # cache["foo"] = "bar"
  # cache["foo"] = "baz"
  # ```
  #
  def []=(key : K, value : V)
    set(key, value)
  end

  # Get value by key, return nil if key is not found
  #
  # ```
  # value = cache["foo"]?
  # ```
  #
  def []?(key : K) : V?
    get(key) { nil }
  end

  # Get value by key, raise KeyError if key is not found
  #
  # ```
  # value = cache["foo"]
  # ```
  #
  def [](key : K)
    get(key) { raise KeyError.new("Key: `#{key}` not found") }
  end
end

class SieveCache::Cache(K, V)
  include CacheBase(K, V)

  @len : UInt32 = 0
  @cap : UInt32

  @head : Node(K, V)?
  @tail : Node(K, V)?
  @cursor : Node(K, V)?

  @store : Hash(K, Node(K, V))

  # Initialize cache with given capacity
  #
  # ```
  # cache = Cache(String, String).new(10)
  # ```
  #
  def initialize(@cap)
    raise ArgumentError.new("Requires cap > 0") unless cap > 0
    @store = Hash(K, Node(K, V)).new(initial_capacity: cap)
  end

  # to string
  #
  # ```
  # cache = Cache(String, String).new(10)
  # pp! cache.to_s
  # ```
  #
  def to_s
    "Cache(len=#{@len},cap=#{@cap},head=#{@head.try &.to_s || "nil"},tail=#{@tail.try &.to_s || "nil"},cursor=#{@cursor.try &.to_s || "nil"})"
  end

  def clear
    store_clear
    @head = @tail = @cursor = nil
    @len = 0
  end

  def has?(key : K) : Bool
    store_has? key
  end

  def set(key : K, value : V)
    node = store_get?(key)
    if node
      node.value = value
      node.visited = true
    else
      node = Node.new(key, value)
      list_add(node)
      store_set(key, node)
    end
  end

  def get(key : K, &)
    node = store_get?(key)
    if node
      node.visited = true
      node.value
    else
      yield key
    end
  end

  def get_or_set(key : K, & : K -> V) : V
    get(key) do
      node = Node.new(key, yield key)
      list_add(node)
      store_set(key, node)
      node.value
    end
  end

  def del(key : K, &)
    node = store_get?(key)
    if node
      store_del(node.key)
      list_del(node)
      node.value
    else
      yield key
    end
  end

  # ------ PRIVATE METHODS -----------------

  private def list_add(node : Node(K, V))
    evict() if full?()
    h = @head
    if !h
      node.next = node.prev = nil
      @head = @tail = @cursor = node
    else
      h.prev = node
      node.prev = nil
      node.next = h
      @head = node
    end
    @len += 1
  end

  private def evict : Node(K, V)
    node = @cursor
    loop do
      raise "Unreachable: assert node is not null" unless node
      if node.visited?
        node.visited = false
        node = node.prev || @tail
      else
        @cursor = node
        store_del(node.key)
        list_del(node)
        return node
      end
    end
  end

  private def list_del(node : Node(K, V))
    return unless @head

    if n = node.prev
      n.next = node.next
    else
      @head = node.next
    end

    if n = node.next
      n.prev = node.prev
    else
      @tail = node.prev
    end

    if node == @cursor
      @cursor = @cursor.not_nil!.prev || @tail
    end

    node.prev = nil
    node.next = nil
    @len -= 1
  end

  private def store_clear
    @store.clear
  end

  private def store_has?(key : K) : Bool
    @store.has_key? key
  end

  private def store_set(key : K, value : Node(K, V))
    @store[key] = value
  end

  private def store_get?(key : K) : Node(K, V)?
    @store[key]?
  end

  private def store_del(key : K)
    @store.delete(key)
  end
end
