import cron, { ScheduledTask } from "node-cron";

class Cron {
  private _isRunning: boolean = true;
  private _task: ScheduledTask;
  private _field: string;
  private _callback: () => void;

  constructor(field: string, callback: () => void) {
    this._task = cron.schedule(field, callback);
    this._field = field;
    this._callback = callback;
  }

  public get isRunning() {
    return this._isRunning;
  }

  public start() {
    if (this._isRunning) {
      return this._isRunning;
    }

    this._isRunning = !this._isRunning;

    this._task = cron.schedule(this._field, this._callback);

    return this._isRunning;
  }

  public stop() {
    if (!this._isRunning) {
      return this._isRunning;
    }

    this._isRunning = !this._isRunning;

    this._task.stop();

    return this._isRunning;
  }
}

export default Cron;
