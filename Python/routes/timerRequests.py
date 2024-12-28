from flask import Blueprint, request, jsonify
from models.TaskTimer import AllTimers

timer_requests_bp = Blueprint('timer_requests', __name__)

all_timers = AllTimers()

@timer_requests_bp.route('/timers', methods=['GET'])
def handle_timer_command():
    user_sentence = request.json
    if not user_sentence or 'command' not in user_sentence:
        return jsonify({"error": "Bad input"}), 422

    user_command = user_sentence['command'].split(" ")[0]
    user_command_target = user_sentence['command'].split(" ")[1] if len(
        user_sentence['command'].split(" ")) > 1 else None

    try:
        if user_command == "start":
            all_timers.startTimer(user_command_target)
        elif user_command == "create":
            all_timers.createTimer(user_command_target)
        elif user_command == "pause":
            all_timers.pauseTimer(user_command_target)
        elif user_command == "reset":
            all_timers.resetTimer(user_command_target)
        elif user_command == "getStatus":
            return jsonify({"message": "Status of timer: " + all_timers.getStatusTimer(user_command_target)})
        elif user_command == "getElapsedTime":
            return jsonify({"message": "Elapsed time since last action: " + all_timers.getElapsedTimeTimer(user_command_target)})
        elif user_command == "getUid":
            return jsonify({"message": "Unique ID of timer: " + all_timers.getUidTimer(user_command_target)})
        elif user_command == "showAllTimers":
            return jsonify({"message": "List of all timers: " + all_timers.showAllTimers()})
        else:
            return jsonify({"error": "Invalid command"}), 422
    except Exception as e:
        return jsonify({"error": str(e)}), 500
