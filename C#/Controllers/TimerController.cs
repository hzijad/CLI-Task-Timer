using Microsoft.AspNetCore.Mvc;
using CLI_Task_Timer_CS.Models;

namespace CS_for_CLI_Task_Timer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimerController : ControllerBase
    {
        private readonly AllTimers _allTimers = AllTimers.Instance;

        public TimerController()
        {
            _allTimers.createTimer("first");
            _allTimers.createTimer("second");
            _allTimers.startTimer("first");
            _allTimers.pauseTimer("first");
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_allTimers.showAllTimers());
        }

        [HttpPost("command")]
        public IActionResult ExecuteCommand([FromBody] UserSentence userSentence)
        {
            var userCommand = userSentence.Command.Split(" ")[0];
            var userCommandTarget = userSentence.Command.Split(" ")[1];

            switch (userCommand)
            {
                case "start":
                    _allTimers.startTimer(userCommandTarget);
                    break;
                case "create":
                    _allTimers.createTimer(userCommandTarget);
                    break;
                case "pause":
                    _allTimers.pauseTimer(userCommandTarget);
                    break;
                case "reset":
                    _allTimers.resetTimer(userCommandTarget);
                    break;
                case "getStatus":
                    return Ok(new { message = "Status of timer: " + _allTimers.getStatusTimer(userCommandTarget) });
                case "getElapsedTime":
                    return Ok(new { message = "Elapsed time since last action: " + _allTimers.getElapsedTimeTimer(userCommandTarget) });
                case "getUid":
                    return Ok(new { message = "Unique ID of timer: " + _allTimers.getUidTimer(userCommandTarget) });
                case "showAllTimers":
                    return Ok(new { message = "List of all timers: " + string.Join(", ", _allTimers.showAllTimers()) });
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