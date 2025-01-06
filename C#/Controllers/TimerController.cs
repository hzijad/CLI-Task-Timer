using Microsoft.AspNetCore.Mvc;
using CLI_Task_Timer_CS.Models;

namespace CLI_Task_Timer_CS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimerController : ControllerBase
    {
        private readonly AllTimers _allTimers = AllTimers.Instance;

        public TimerController()
        {
            _allTimers.CreateTimer("first");
            _allTimers.CreateTimer("second");
            _allTimers.StartTimer("first");
            _allTimers.PauseTimer("first");
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_allTimers.ShowAllTimers());
        }

        [HttpPost("command")]
        public IActionResult ExecuteCommand([FromBody] UserSentence userSentence)
        {
            var userCommand = userSentence.Command.Split(" ")[0];
            var userCommandTarget = userSentence.Command.Split(" ")[1];

            switch (userCommand)
            {
                case "start":
                    _allTimers.StartTimer(userCommandTarget);
                    break;
                case "create":
                    _allTimers.CreateTimer(userCommandTarget);
                    break;
                case "pause":
                    _allTimers.PauseTimer(userCommandTarget);
                    break;
                case "reset":
                    _allTimers.ResetTimer(userCommandTarget);
                    break;
                case "getStatus":
                    return Ok(new { message = "Status of timer: " + _allTimers.GetStatusTimer(userCommandTarget) });
                case "getElapsedTime":
                    return Ok(new { message = "Elapsed time since last action: " + _allTimers.GetElapsedTimeTimer(userCommandTarget) });
                case "getUid":
                    return Ok(new { message = "Unique ID of timer: " + _allTimers.GetUidTimer(userCommandTarget) });
                case "showAllTimers":
                    return Ok(new { message = "List of all timers: " + string.Join(", ", _allTimers.ShowAllTimers()) });
                default:
                    return UnprocessableEntity();
            }

            return Ok();
        }
    }

    public class UserSentence
    {
        public string Command { get; set; }
    }
}