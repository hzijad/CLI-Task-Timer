using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace CLI_Task_Timer_CS.Models
{
    public class AllTimers
    {
        private static AllTimers _instance;
        public Dictionary<string, TaskTimer> TimerList { get; private set; }
        private const string DatabaseFilePath = "Data/database.json";

        // Private constructor to prevent instantiation
        private AllTimers()
        {
            TimerList = LoadTimersFromFile();
        }

        // Public static method to get the instance
        public static AllTimers Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new AllTimers();
                }
                return _instance;
            }
        }

        private Dictionary<string, TaskTimer> LoadTimersFromFile()
        {
            if (!File.Exists(DatabaseFilePath))
            {
                return new Dictionary<string, TaskTimer>();
            }

            var json = File.ReadAllText(DatabaseFilePath);
            return JsonSerializer.Deserialize<Dictionary<string, TaskTimer>>(json) ?? new Dictionary<string, TaskTimer>();
        }

        private void SaveTimersToFile()
        {
            var json = JsonSerializer.Serialize(TimerList, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(DatabaseFilePath, json);
        }

        private string createTimer(string name)
        {
            if (TimerList.ContainsKey(name))
            {
                throw new ArgumentException("A timer with name \"" + name + "\" already exists.");
            }
            TimerList[name] = new TaskTimer(name);
            SaveTimersToFile();
            return($"Timer with name \"{name}\" created.");
        }

        private string startTimer(string name)
        {
            if (!TimerList.ContainsKey(name))
            {
                throw new ArgumentException("A timer with name \"" + name + "\" does not exist.");
            }
            else if (TimerList[name].getStatus() == "started")
            {
                throw new InvalidOperationException("Timer already started");
            }
            else if (TimerList[name].getStatus() == "stopped")
            {
                throw new InvalidOperationException("Timer is stopped");
            }

            TimerList[name].start();
            SaveTimersToFile();
            return name + " started";
        }

        private string pauseTimer(string name)
        {
            if (!TimerList.ContainsKey(name))
            {
                throw new ArgumentException("A timer with name \"" + name + "\" does not exist.");
            }
            else if (TimerList[name].getStatus() == "paused")
            {
                throw new InvalidOperationException("Timer already paused");
            }
            else if (TimerList[name].getStatus() == "stopped")
            {
                throw new InvalidOperationException("Timer is stopped");
            }

            TimerList[name].pause();
            SaveTimersToFile();
            return name + " paused";
        }

        private string resetTimer(string name)
        {
            if (!TimerList.ContainsKey(name))
            {
                throw new ArgumentException("A timer with name \"" + name + "\" does not exist.");
            }

            TimerList[name].reset();
            SaveTimersToFile();
            return name + " reset";
        }

        private string stopTimer(string name)
        {
            if (!TimerList.ContainsKey(name))
            {
                throw new ArgumentException("A timer with name \"" + name + "\" does not exist.");
            }
            else if (TimerList[name].getStatus() == "stopped")
            {
                throw new InvalidOperationException("Timer is already stopped");
            }

            TimerList[name].stop();
            SaveTimersToFile();
            return name + " stopped";
        }

        private string getStatusTimer(string name)
        {
            if (!TimerList.ContainsKey(name))
            {
                throw new ArgumentException("A timer with name \"" + name + "\" does not exist.");
            }
            return TimerList[name].getStatus();
        }

        private string getElapsedTimeTimer(string name)
        {
            if (!TimerList.ContainsKey(name))
            {
                throw new ArgumentException("A timer with name \"" + name + "\" does not exist.");
            }
            return TimerList[name].getElapsedTime();
        }

        private string getUidTimer(string name)
        {
            if (!TimerList.ContainsKey(name))
            {
                throw new ArgumentException("A timer with name \"" + name + "\" does not exist.");
            }
            return TimerList[name].getUid();
        }

        private List<string> showAllTimers()
        {
            return new List<string>(TimerList.Keys);
        }
    }
}