from utils import utility
import time


class TaskTimer:
    def __init__(self, name):
        self.name = name
        self.uid = utility.make_id(6)
        self.updated_at = time.time()
        self.action_list = [{"action": "created", "date": self.updated_at}]

    def start(self):
        self.updated_at = time.time()
        self.action_list.append({"action": "started", "date": self.updated_at})

    def pause(self):
        self.updated_at = time.time()
        self.action_list.append({"action": "paused", "date": self.updated_at})

    def reset(self):
        self.updated_at = time.time()
        self.action_list = [{"action": "created", "date": self.updated_at}]

    def get_status(self):
        return self.action_list[-1]["action"]

    def get_elapsed_time(self):
        last_action = self.action_list[-1]
        elapsed_time = time.time() - last_action["date"]
        return elapsed_time

    def get_uid(self):
        return self.uid


class AllTimers:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(AllTimers, cls).__new__(cls)
            cls._instance.timer_list = {}
        return cls._instance

    def create_timer(self, name):
        if name in self.timer_list:
            raise ValueError(f"Timer with name \"{name}\" already exists.")
        self.timer_list[name] = TaskTimer(name)

    def start_timer(self, name):
        if name not in self.timer_list:
            raise ValueError(f"Timer with name \"{name}\" does not exist.")
        if self.timer_list[name].get_status() == "started":
            raise ValueError("Timer already started.")
        elif self.timer_list[name].get_status() == "stopped":
            raise ValueError("Timer is stopped.")
        self.timer_list[name].start()

    def pause_timer(self, name):
        if name not in self.timer_list:
            raise ValueError(f"Timer with name \"{name}\" does not exist.")
        if self.timer_list[name].get_status() == "paused":
            raise ValueError("Timer already paused.")
        elif self.timer_list[name].get_status() == "stopped":
            raise ValueError("Timer is stopped.")
        self.timer_list[name].pause()

    def reset_timer(self, name):
        if name not in self.timer_list:
            raise ValueError(f"Timer with name \"{name}\" does not exist.")
        self.timer_list[name].reset()

    def stop_timer(self, name):
        if name not in self.timer_list:
            raise ValueError(f"Timer with name \"{name}\" does not exist.")
        if self.timer_list[name].get_status() == "stopped":
            raise ValueError("Timer already stopped.")
        self.timer_list[name].stop()

    def get_status_timer(self, name):
        if name not in self.timer_list:
            raise ValueError(f"Timer with name \"{name}\" does not exist.")
        return self.timer_list[name].get_status()

    def get_elapsed_time_timer(self, name):
        if name not in self.timer_list:
            raise ValueError(f"Timer with name \"{name}\" does not exist.")
        return self.timer_list[name].get_elapsed_time()

    def get_uid_timer(self, name):
        if name not in self.timer_list:
            raise ValueError(f"Timer with name \"{name}\" does not exist.")
        return self.timer_list[name].get_uid()

    def show_all_timers(self):
        return [f" {key}" for key in self.timer_list.keys()]
