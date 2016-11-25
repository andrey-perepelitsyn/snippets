var timeoutSeconds = 60 * 20;

var key = "HKEY_CURRENT_USER\\Software\\pomodoro";
var wsh = WScript.CreateObject("WScript.Shell");

try {
	wsh.RegRead(key);
	if(wsh.Popup("Already running! Stop it?", 5, "", 4) == 6) {
		wsh.RegDelete(key);
	}
} catch(e) {
	wsh.RegWrite(key, "running", "REG_SZ");
	var notStopped = true;
	for(var i = 0; i < timeoutSeconds && notStopped; i++) {
		WScript.Sleep(1000);
		try {
			wsh.RegRead(key);
		} catch(e) {
			notStopped = false;
		}
	}
	if(notStopped) {
		wsh.Popup("It's time to have a rest!", 0, "Have a rest", 0);
		wsh.RegDelete(key);
	}
}
