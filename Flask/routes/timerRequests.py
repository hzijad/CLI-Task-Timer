from flask import Blueprint, request, jsonify
from models.TaskTimer import AllTimers

timer_requests_bp = Blueprint('timer_requests', __name__)

all_timers = AllTimers()

@timer_requests_bp.route('/timers', methods=['POST'])
def handle_timer_command():
    user_sentence = request.json
    if not user_sentence or 'command' not in user_sentence:
        return jsonify({"error": "Bad input"}), 422

    user_command = user_sentence['command'].split(" ")[0]
    user_command_target = user_sentence['command'].split(" ")[1] if len(
        user_sentence['command'].split(" ")) > 1 else None




    try:
        if user_command == "start":
            return jsonify({"message": all_timers.start_timer(user_command_target)})
        elif user_command == "create":
            return jsonify({"message": all_timers.create_timer(user_command_target)})
        elif user_command == "pause":
            return jsonify({"message": all_timers.pause_timer(user_command_target)})
        elif user_command == "reset":
            return jsonify({"message": all_timers.reset_timer(user_command_target)})
        elif user_command == "getStatus":
            return jsonify({"message": "Status of timer: " + all_timers.get_status_timer(user_command_target)})
        elif user_command == "getElapsedTime":
            return jsonify(
                {"message": "Elapsed time since last action: " + all_timers.get_elapsed_time_timer(user_command_target)})
        elif user_command == "getUid":
            return jsonify({"message": "Unique ID of timer: " + all_timers.get_uid_timer(user_command_target)})
        elif user_command == "showAllTimers":
            print("showing all timers")
            print(all_timers.show_all_timers())
            return jsonify({"message": "List of all timers:" + ",".join(all_timers.show_all_timers())})
        else:
            return jsonify({"error": "Invalid command"}), 422
    except Exception as e:
        return jsonify({"error": str(e)}), 500
