using System;

namespace CLI_Task_Timer_CS.Models
{
    public class TaskTimer
    {
        private string Name { get; set; }
        private string Uid { get; set; }
        private DateTime UpdatedAt { get; set; }
        private List<(string action, DateTime date)> ActionList { get; set; }

        public TaskTimer(string name)
        { 
            var utility = new Utility();
            Name = name;
            Uid = utility.makeID(6);
            UpdatedAt = DateTime.Now;
            ActionList = new List<(string action, DateTime date)>();
            ActionList.Add(("created", DateTime.Now));
        }


        public void start()
        {
            UpdatedAt = DateTime.Now;
            ActionList.Add(("started", DateTime.Now));
        }
        public void stop()
        {
            UpdatedAt = DateTime.Now;
            ActionList.Add(("stopped", DateTime.Now));
        }
        public void pause()
        {
            UpdatedAt = DateTime.Now;
            ActionList.Add(("paused", DateTime.Now));
        }
        public void reset ()
        {
            UpdatedAt = DateTime.Now;
            ActionList.Add(("created", DateTime.Now));
        }
        public string getStatus()
        {
            if (ActionList.Count == 0)
            {
                return "No actions recorded.";
            }
            var latestAction = ActionList[ActionList.Count - 1];
            return $"Last action: {latestAction.action} at {latestAction.date}";
        }
        public string getElapsedTime()
        {
            return ("Time since task " + ActionList[ActionList.Count - 1].action +
                    ActionList[ActionList.Count - 1].date);
        }
        public string getUid()
        {
            return Uid;
        }


}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}