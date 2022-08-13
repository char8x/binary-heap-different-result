import testCaseMap from "./test-case-map.json" assert { type: "json" };
import { BinaryHeap } from "https://deno.land/std@0.152.0/collections/binary_heap.ts";
import Heap from "https://esm.sh/heap@0.2.7";
import {
  differenceWith,
  isEqual,
} from "https://cdn.skypack.dev/lodash@4.17.21?dts";

function topKFrequent(nums, k) {
  const map = testCaseMap;
  // binary heap
  const minBinaryHeap = new BinaryHeap((a, b) => a.count - b.count);
  // heap
  const minHeap = new Heap((a, b) => a.count - b.count);
  // array
  let result = [];

  const keyArr = Object.keys(map);

  for (let i = 0; i < nums; i++) {
    const key = keyArr[i];

    if (minBinaryHeap.length < k) {
      // 如果最小堆没满，直接插入
      minBinaryHeap.push({ key: Number(key), count: map[key] });
    } else if (map[key] > minBinaryHeap.peek().count) {
      // 如果最小堆满了，判断当前元素的频率是否大于最小堆的顶部元素的频率，如果大于，则替换最小堆的顶部元素
      minBinaryHeap.pop();
      minBinaryHeap.push({ key: Number(key), count: map[key] });
    }

    if (minHeap.size() < k) {
      // 如果最小堆没满，直接插入
      minHeap.push({ key: Number(key), count: map[key] });
    } else if (map[key] > minHeap.peek().count) {
      // 如果最小堆满了，判断当前元素的频率是否大于最小堆的顶部元素的频率，如果大于，则替换最小堆的顶部元素
      minHeap.pop();
      minHeap.push({ key: Number(key), count: map[key] });
    }

    result.push({ key: Number(key), count: map[key] });
  }

  result = result.sort((a, b) => b.count - a.count).slice(0, k);

  console.log(
    "array vs Heap\n",
    differenceWith(result, minHeap.toArray(), isEqual),
    "\n",
    differenceWith(minHeap.toArray(), result, isEqual)
  );

  console.log(
    "array vs BinaryHeap\n",
    differenceWith(result, [...BinaryHeap.from(minBinaryHeap)], isEqual),
    "\n",
    differenceWith([...BinaryHeap.from(minBinaryHeap)], result, isEqual)
  );

  console.log(
    "BinaryHeap vs Heap\n",
    differenceWith(
      [...BinaryHeap.from(minBinaryHeap)],
      minHeap.toArray(),
      isEqual
    ),
    "\n",
    differenceWith(
      minHeap.toArray(),
      [...BinaryHeap.from(minBinaryHeap)],
      isEqual
    )
  );
}

topKFrequent(100, 50);
console.log("......................");
topKFrequent(100, 65);
