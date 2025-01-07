using System;

namespace CLI_Task_Timer_CS.Models
{
    public class Utility
    {
        public string makeID(int length)
        {
            var result = "";
            const string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            int charactersLength = characters.Length;
            var counter = 0;
            var random = new Random();
            while (counter < length)
            {
                result+=characters[random.Next(charactersLength)];
                counter += 1;
            }
            return result;
        }
    }
}