require "./bench_helper"

record S, a : StaticArray(UInt8, 12), b : Int64

Benchmark.ips(warmup: 4, calculation: 10) do |x|
  x.report "sequence" do
    cache = SieveCache::Cache(Int64, Int64).new(68)

    (1..1000).each do |i|
      n = i % 100
      cache[n] = n
    end

    (1..1000).each do |i|
      n = i % 100
      _ = cache[n]?
    end
  end

  x.report "composite" do
    cache = SieveCache::Cache(Int64, S).new(68)
    r = Random.new

    (1..1000).each do
      n = r.rand(100)
      cache[n] = S.new(a: StaticArray(UInt8, 12).new(0), b: n)
    end

    (1..1000).each do
      n = r.rand(100)
      _ = cache[n]?
    end
  end

  x.report "compositeNormal" do
    sigma = 50 // 3
    cache = SieveCache::Cache(Int64, S).new(sigma.to_u32)

    r = Random.new

    (1..1000).each do
      n = r.rand(100)
      cache[n] = S.new(a: StaticArray(UInt8, 12).new(0), b: n)
    end

    (1..1000).each do
      n = r.rand(100)
      _ = cache[n]?
    end
  end
end
