require "./spec_helper"

describe SieveCache do
  it "smoke test" do
    cache = SieveCache::Cache(String, String).new(3)
    cache.cap.should eq 3
    cache["foo"] = "foocontent"
    cache["foo"].should eq "foocontent"
    cache.has?("foo").should be_true
    cache["bar"] = "barcontent"
    cache.del("bar").should eq "barcontent"
    expect_raises(KeyError) do
      cache["bar"]
    end
    cache["bar2"] = "bar2content"
    cache["bar3"] = "bar3content"
    cache.len.should eq 3
    cache.full?.should be_true
    cache.clear
    cache.len.should eq 0
  end

  it "get_or_set" do
    cache = SieveCache::Cache(String, String).new(3)
    value = cache.get_or_set("hello") do |_key|
      "world"
    end
    value.should eq "world"

    cache.get_or_set("hello") do |_key|
      "crystal"
    end
    value.should eq "world"

    cache.len.should eq 1
  end

  it "formatting" do
    cache = SieveCache::Cache(String, Int32).new(1)
    cache.to_s.should eq "Cache(len=0,cap=1,head=nil,tail=nil,cursor=nil)"
  end

  it "update visited flag when the entry is updated" do
    cache = SieveCache::Cache(String, String).new(2)
    cache["key1"] = "value1"
    cache["key2"] = "value2"
    # update `key1` entry.
    cache["key1"] = "updated"
    # add new entry.
    cache["key3"] = "value3"
    cache.has?("key1").should be_true
  end
end
