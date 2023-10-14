class MemoryTracker {
  constructor({ memoryUsageLimit }) {
    this.memoryUsageLimit = memoryUsageLimit;
  }

  memoryUsage() {
    // @see https://nodejs.org/api/process.html#processmemoryusage
    const memory = process.memoryUsage();
    console.log('MemoryTracker', { memory });
    return memory.heapUsed;
  }

  isBusy() {
    return this.memoryUsage() > this.memoryUsageLimit;
  }
}

module.exports = { MemoryTracker };
