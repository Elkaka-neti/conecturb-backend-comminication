const cron = require("node-cron");

class Timer {
  static every(interval) {
    return new TimerBuilder(interval);
  }

  static exec(cronExp, fn) {
    if (!cron.validate(cronExp)) {
      console.error(`[401] Expressão inválida: ${cronExp}`);
      return;
    }
    cron.schedule(cronExp, fn);
  }
}

class TimerBuilder {
  constructor(interval) {
    this.interval = this.parseInterval(interval);
    this.maxTimes = 1;
    this.tickFn = null;
    this.finalFn = null;
  }

  // converte segundos e minutos em expressão
  parseInterval(interval) {
    if (interval.endsWith("s")) {
      const sec = parseInt(interval);
      return `*/${sec} * * * * *`;
    }
    if (interval.endsWith("m")) {
      const min = parseInt(interval);
      return `*/${min} * * * *`;
    }
    throw new Error(`[401] Intervalo inválido: ${interval}`);
  }

  times(n) {
    this.maxTimes = n;
    return this;
  }

  do(fn) {
    this.tickFn = fn;
    this.start();
    return this;
  }

  finally(fn) {
    this.finalFn = fn;
    return this;
  }

  start() {
    if (!cron.validate(this.interval)) {
      console.error(`[401] Expressão inválida: ${this.interval}`);
      return;
    }

    let count = 0;

    const task = cron.schedule(this.interval, () => {
      count++;
      if (count < this.maxTimes) {
        this.tickFn && this.tickFn({ count, remaining: this.maxTimes - count });
      } else {
        this.finalFn && this.finalFn();
        task.stop();
      }
    });

    return this;
  }
}

module.exports = {Timer}